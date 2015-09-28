import amqp from "amqplib";

export class server {
    constructor(router) {
        this.router = router;
    }

    async listen() {
        this.conn = await amqp.connect('amqp://localhost');
        this.ch = await this.conn.createChannel();
        this.ch.assertQueue("rpc_queue", {durable: false});
        this.ch.prefetch(10);

        this.ch.consume("rpc_queue", (msg) => {
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