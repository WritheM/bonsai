import amqp from "amqplib";
let config = require("config").rabbit;

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

                p.resolve(msg);
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