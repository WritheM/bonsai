import {rabbit as config} from "config";
import amqp from "amqplib";
import {EventEmitter2} from "eventemitter2";

export class Server {
    constructor(router) {
        this.router = router;
    }

    async connect() {
        this.conn = await amqp.connect(config.host);
        this.ch = await this.conn.createChannel();
    }

    async listen() {
        await this.connect();
        this.ch.assertQueue(config.rpcqueue, {durable: false});
        this.ch.prefetch(10);

        this.ch.consume(config.rpcqueue, (msg) => {
            let data = JSON.parse(msg.content.toString());
            let response = {data: [], status: ""};
            let func;
            console.log(data);
            try {
                func = this.router.getRoute(data.path);

                func(data.data, data.conn).then(res => {
                    response.data = res;
                    response.status = "ok";

                    this.ch.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(response)), {correlationId: msg.properties.correlationId});
                    this.ch.ack(msg);
                }).catch(res => {
                    console.error(res);
                    console.error(res.stack);
                    response.status = res.toString();

                    this.ch.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(response)), {correlationId: msg.properties.correlationId});
                    this.ch.ack(msg);
                });

            }
            catch (e) {
                response.status = e.toString();

                this.ch.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(response)), {correlationId: msg.properties.correlationId});
                this.ch.ack(msg);
            }

            //let auth = models.Auth.findOne({where: {token: data.auth}});
        });
    }



}

export class Broadcast {
    constructor() {
        this.emitter = new EventEmitter2({
            wildcard: true
        });
    }

    async connect() {
        this.conn = await amqp.connect(config.host);
        this.ch = await this.conn.createChannel();
        await this.ch.assertExchange(config.broadcastqueue, 'topic', {durable: false});
        this.q = await this.ch.assertQueue('', {exclusive: true});
    }

    broadcast(topic, data) {
        this.ch.publish(config.broadcastqueue, topic, new Buffer(JSON.stringify(data)));
    }

    async listen() {
        await this.connect();
        this.ch.consume(this.q.queue, msg => {
            let key = msg.fields.routingKey;
            let data = JSON.parse(msg.content.toString());

            this.emitter.emit(key, {event: key, data: data});

        }, {noAck: true});
    }

    subscribe(key) {
        this.ch.bindQueue(this.q.queue, config.broadcastqueue, key);
    }

    unsubscribe(key) {
        this.ch.unbindQueue(this.q.queue, config.broadcastqueue, key);
    }

    on(key, listener) {
        this.emitter.on(key, listener);
    }

    off(key, listener) {
        this.emitter.off(key, listener);
    }
}

export class Client {
    constructor() {
        this.callbacks = {};
    }

    async listen() {
        this.conn = await amqp.connect(config.host);
        this.ch = await this.conn.createChannel();
        this.q = await this.ch.assertQueue('', {exclusive: true});

        this.ch.consume(this.q.queue, msg => {
            var corr = msg.properties.correlationId;
            if (corr in this.callbacks) {
                var p = this.callbacks[corr];
                delete this.callbacks[corr];

                let data = JSON.parse(msg.content.toString());
                if (data.status == "ok")
                    p.resolve(data);
                else
                    p.reject(data);
            }
        }, {noAck: true});
    }


    call(data) {
        return new Promise((resolve, reject) => {
            var corr = generateUuid();

            this.callbacks[corr] = {
                resolve: resolve,
                reject: reject,
                time: Date.now()
            };

            this.ch.sendToQueue(config.rpcqueue, new Buffer(JSON.stringify(data)), {
                correlationId: corr, replyTo: this.q.queue
            });
        });
    }

    prune() {
        let timeout = this.config.call_timeout;
        if (!isFinite(timeout) || timeout <= 0) {
            return;
        }

        var now = Date.now();
        for (var key in this.callbacks) {
            if (this.callbacks.hasOwnProperty(key)) {
                var callback = this.callbacks[key];

                var diff = now - callback.time;

                if (diff > timeout) {
                    delete this.callbacks[key];
                    callback.reject("timeout");
                }
            }
        }
    }
}


function generateUuid() {
    return Math.random().toString() +
        Math.random().toString() +
        Math.random().toString();
}