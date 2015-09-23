import amqp from "amqplib";
import models from "./models";

export class server {
    constructor(router) {
        this.router = router;
    }

    async listen() {
        this.conn = await amqp.connect('amqp://localhost');
        this.ch = await this.conn.createChannel();
        this.ch.assertQueue("rpc_queue", {durable: false});
        this.ch.prefetch(1);

        this.ch.consume("rpc_queue", async function (msg) {
            let data = JSON.parse(msg);
            var response = {data: [], status: ""};

            var func = this.router.getRoute(data.path);

            let auth = models.Auth.findOne({where: {token: data.auth}});

            func(data.data, auth).then(res => {
                response.data = res;
                response.status = "OK";
            }).catch(res => {
                response.status = res.toString();
            }).finally(() => {
                this.ch.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(response)), {correlationId: msg.properties.correlationId});
                this.ch.ack(msg);
            });

        });
    }

    //func must be async (promise) based.
    addAction(actionName, actionType, func) {
        if (!(actionName in this.actions)) {
            this.actions[actionName] = {};
        }
        this.actions[actionName][actionType] = func;
    }
}