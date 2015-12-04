import {EventEmitter2}  from "eventemitter2";

import {
    uuid,
    isPromise
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

        try {
            this.routeMessage(pkg.route, pkg.data)
                .then(
                    response => {

                        if (msg.properties.type == 'rpc' &&
                            msg.properties.replyTo) {
                            // Return To RPC

                            console.log(' [*] RPC Response To', msg.properties.replyTo, ', Corr', msg.properties.correlationId);

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
                                error: error.toString()
                            };

                            this.channel.sendToQueue(
                                msg.properties.replyTo,
                                new Buffer(JSON.stringify(respMsg)),
                                { correlationId: msg.properties.correlationId }
                            );
                        }

                        console.error('Error While Handling Message ' + msg.properties.correlationId, error);
                    }
                );
        } catch (e) {
            console.error('Error While Handling Message ' + msg.properties.correlationId, e);
        }
    }

    routeMessage(route, data) {
        return new Promise((res, rej) => {
            try {
                var result = {};
                var handled = this.emitter.emit(route, route, data, result);
                if (handled) {
                    console.log(' [+] Emitted, Response', result);
                }

                res(result, handled);
            } catch (e) {
                // We either had an exception during the emission or the callback(s)
                // threw exceptions.

                rej(e);
            }
        });
    }

    rpc(route, data) {
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

        this.channel.publish(
            this.options.exchange,
            route,
            new Buffer(JSON.stringify(pkg)),
            {
                type: 'broadcast'
            }
        );
    }

    on(group, route, callback) {

        let queueName;

        if (!!group && this.queues.group) {
            queueName = this.queues.group.queue;
        } else if (!group) {
            queueName = this.queues.instance.queue;
        }

        this.channel.bindQueue(
            queueName,
            this.options.exchange,
            route,
            {
                // TODO ?
            }
        );

        return this.emitter.on(route, callback);
    }

    off(group, route, callback) {

        // TODO: Keep track of binds / unbinds incase amqp / rabbit don't like it

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

        return this.emitter.off(route, callback);
    }
}
