import {EventEmitter2}  from "eventemitter2";

import {
    uuid,
    isPromise,
    debug
}                       from "../utilities";

import QueueClient      from "./QueueClient";

let defaultOptions = {
    path: null,
    exchange: 'broadcast',
    group: null,
    rpcTimeout: 30000,
    router: (route, data) => null
};

/**
 * A Client to listen/publish to the broadcast queue
 */
export default class BroadcastClient extends QueueClient {

    constructor(options) {

        options = Object.assign({}, defaultOptions, options);

        super(options.path);

        this.options = options;

        this.queues = {
            rpc: null,
            instance: null,
            group: null
        };

        this.exchange = null;

        this.rpcPromises = {};

        this.emitter = new EventEmitter2({
            wildcard: true
        });
    }

    async initialize() {

        // The Exchange to publish/subscribe to
        this.exchange = await this.channel.assertExchange(
            this.options.exchange,
            'topic',
            { durable: false }
        );

        // Create a unique queue to this instance that isn't durable
        // this way it will be cleaned up when this connection is closed.
        this.queues.instance = await this.channel.assertQueue(
            '',
            { exclusive: true, durable: false }
        );

        // For now until we determine if this is actually needed (to be dedicated)
        // we will have a dedicated RPC receiving queue that will never be
        // scheduled into the exchange.
        this.queues.rpc = await this.channel.assertQueue(
            '',
            { exclusive: true, durable: false }
        );

        if (this.options.group) {
            // Create an optional round-robin queue to bind to
            this.queues.group = await this.channel.assertQueue(
                group,
                { durable: false }
            );
        }

        // Set up a consumer to react to incoming messages
        this.channel.consume(
            this.queues.instance.queue,
            msg => {
                this.handleMessage(msg);
            },
            {noAck: false}
        );

        // Set up a consumer to react to incoming rpc messages
        this.channel.consume(
            this.queues.rpc.queue,
            msg => {
                this.handleRPC(msg);
            },
            {noAck: false}
        );

        if (this.queues.group) {
            this.channel.consume(
                this.queues.group.queue,
                msg => {
                    this.handleMessage(msg);
                },
                {noAck: false}
            );
        }
    }

    handleRPC(msg) {
        var rpcID = msg.properties.correlationId;
        var rpcPromise = this.rpcPromises[rpcID];

        if (!rpcPromise) {
            return;
        }

        try {
            var data = JSON.parse(msg.content.toString());

            debug(' [<] RPC RESPONSE', data);

            if (data.success) {
                rpcPromise.resolve(data.response);
            } else {
                rpcPromise.reject(data.error);
            }
        } catch (e) {
            console.error('Exception While Processing RPC Response ', msg, e);

            rpcPromise.reject(e.toString());
        } finally {
            // Stop the auto-clear
            clearTimeout(rpcPromise.timeout);

            // Remove from registry
            delete this.rpcPromises[rpcID];
        }
    }

    handleMessage(msg) {
        var pkg = JSON.parse(msg.content.toString());

        debug(' [<]', msg.properties.type == 'rpc' ? 'RPC' : 'BROADCAST', pkg);

        try {
            this.routeMessage(pkg.route, pkg.data)
                .then(
                    response => {

                        if (msg.properties.type == 'rpc' &&
                            msg.properties.replyTo) {
                            // Return To RPC

                            debug(' [>] RPC RESPONSE To `' + msg.properties.replyTo + '`, Corr `' + msg.properties.correlationId + '`');

                            var respMsg = {
                                success: true,
                                response: response
                            };

                            this.channel.sendToQueue(
                                msg.properties.replyTo,
                                new Buffer(JSON.stringify(respMsg)),
                                { correlationId: msg.properties.correlationId }
                            );
                        }

                        //this.channel.ack(msg);
                    }
                )
                .catch(
                    error => {
                        if (msg.properties.type == 'rpc' &&
                            msg.properties.replyTo) {
                            // Send failure to RPC
                            var respMsg = {
                                success: false,
                                error: error.toString(),
                                stack: error.stack
                            };

                            debug(' [>] RESPONSE To `' + msg.properties.replyTo + '`, Corr `' + msg.properties.correlationId + '`');

                            this.channel.sendToQueue(
                                msg.properties.replyTo,
                                new Buffer(JSON.stringify(respMsg)),
                                { correlationId: msg.properties.correlationId }
                            );
                        }

                        var errorMessage = (error instanceof Error) ? error.stack : error.toString();
                        console.error('Error While Handling Message ' + msg.properties.correlationId, errorMessage);
                    }
                );
        } catch (e) {
            console.error('Error While Handling Message ' + msg.properties.correlationId, e);
        }
    }

    routeMessage(path, data) {

        // TODO: I don't like mixing routing errors with rejections from the route.

        return new Promise((res, rej) => {

            var route = this.options.router(path, data);
            if (route) {

                if (isPromise(route)) {
                    debug(' [^] CLIENT Route is a Promise');
                    route.then(res, rej);
                } else {
                    debug(' [^] CLIENT Route is NOT a Promise');
                    rej(new Error("Route for `" + path + "` returned a non-promise."));
                }

            } else {
                rej(new Error("No Route Handler for route `" + path + "`."));
            }

        });

    }

    rpc(route, data) {

        if (!route) {
            throw new Error('Must RPC to a non-empty route.');
        }

        let pkg = {
            route: route,
            data: data
        };

        let rpcID = uuid();

        let rpcController = {
            resolve: null,
            reject: null,
            timeout: null
        };

        let rpcPromise = new Promise((res, rej) => {
            rpcController.resolve = res;
            rpcController.reject = rej;
        });

        this.rpcPromises[rpcID] = rpcController;

        debug(' [>] RPC Exchange `' + this.options.exchange + '`, reply to `' + this.queues.rpc.queue + '` with route `' + route + '`');

        this.channel.publish(
            this.options.exchange,
            route,
            new Buffer(JSON.stringify(pkg)),
            {
                type: 'rpc',
                replyTo: this.queues.rpc.queue,
                correlationId: rpcID
            }
        );

        // Timeout RPC Promise
        rpcController.timeout = setTimeout(_ => {

            console.error(' [X] RPC Message ' + rpcID + ' was not returned in a timely fassion.');

            // Send the rejection
            rpcController.reject('RPC Message was not returned in a timely fassion.');

            // Remove from registry
            delete this.rpcPromises[rpcID];

        }, this.options.rpcTimeout);

        return rpcPromise;
    }

    broadcast(route, data) {
        let pkg = {
            route: route,
            data: data
        };

        debug(' [>] Broadcast Exchange `' + this.options.exchange + '`, with route `' + route + '`');

        this.channel.publish(
            this.options.exchange,
            route,
            new Buffer(JSON.stringify(pkg)),
            {
                type: 'broadcast'
            }
        );
    }

    watch(route, group = false) {

        let queueName;

        if (!!group && this.queues.group) {
            queueName = this.queues.group.queue;
        } else if (!group) {
            queueName = this.queues.instance.queue;
        }

        debug(' [*] Exchange Watch `' + route + '`, Group = ' + group + ' for queue `' + queueName + '` on exchange `' + this.options.exchange + '`');

        this.channel.bindQueue(
            queueName,
            this.options.exchange,
            route,
            {
                // TODO ?
            }
        );
    }

    unwatch(route, group = false) {

        // TODO: Keep track of binds / unbinds incase amqp / rabbit don't like it

        debug(' [*] Exchange Un-Watch `' + route + '`, Group = ' + group + ' for queue `' + queueName + '` on exchange `' + this.options.exchange + '`');

        let queueName;

        if (!!group && this.queues.group) {
            queueName = this.queues.group.queue;
        } else if (!group) {
            queueName = this.queues.instance.queue;
        }

        this.channel.unbindQueue(
            queueName,
            this.options.exchange,
            route,
            {
                // TODO ?
            }
        );
    }
}
