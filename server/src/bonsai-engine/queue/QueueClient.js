import ampq from "amqplib"

/**
 * A Queue Client base class, Sets up the basics for attaching to a queue in the
 * message queue and connecting up to the events there-in
 */
export default class QueueClient {

    constructor(path) {
        this.path = path;

        this.connection = null;
        this.channel = null;
        this.listening = false;
    }

    async connect() {
        if (this.connection) {
            throw new Error("Already Connected");
        }

        this.connection = await ampq.connect(this.path);
        this.channel = await this.connection.createChannel();
    }

    async disconnect() {
        if (this.connection) {
            this.connection.close();
        }

        this.connection = null;
        this.channel = null;
    }

    async listen() {

        if (this.listening) {
            console.warn('QueueClient Attempted to Listen while already listening.');
            return;
        }

        if (!this.connection) {
            await this.connect();
        }

        await this.initialize();

        this.listening = true;
    }

    async initialize() {
        throw new Error("No Implementation for `initialize` was available.");
    }

    respondToMessage(msg, response) {
        this.channel.sendToQueue(
            msg.properties.replyTo,
            new Buffer(JSON.stringify(response)),
            {correlationId: msg.properties.correlationId}
        );

        this.channel.ack(msg);
    }

}