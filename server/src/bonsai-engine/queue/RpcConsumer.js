import {EventEmitter2} from "eventemitter2";

import {Router} from "../routing";
import QueueClient from "./QueueClient"

let defaultRouter = new Router();
let defaultOptions = {
    path: null,
    queue: 'queue',
    prefetch: 10,
    router: defaultRouter,
    routeArgumentProvider: data => [data]
};

/**
 * A Client to listen/publish to the broadcast queue
 */
export default class RpcConsumer extends QueueClient {

    constructor(options) {

        options = Object.assign({}, defaultOptions, options);

        super(options.path);

        this.options = options;

        this.queue = null;

        this.emitter = new EventEmitter2({
            wildcard: true
        });
    }

    async initialize() {

        // Create a unique queue to this instance
        this.queue = await this.channel.assertQueue(
            this.options.queue,
            { durable: false }
        );

        this.channel.prefetch(this.options.prefetch);

        // Set up a consumer to react to incoming messages
        this.channel.consume(
            this.queue.queue,
            msg => {
                let data = JSON.parse(msg.content.toString());
                let response = {data: [], status: ""};
                let func;

                // TODO: Debug Only
                console.log(' [*] RPC Message Received: ', data);

                try {
                    func = this.options.router.getRoute(data.path);
                    func(...(this.options.routeArgumentProvider(data)))
                        .then(res => {
                            response.data = res;
                            response.status = "ok";

                            this.respondToMessage(msg, response);
                        })
                        .catch(res => {
                            response.status = res.toString();

                            console.error(' [*] Broadcast Handler Error: ', res);

                            this.respondToMessage(msg, response);
                        });

                } catch (e) {
                    response.status = e.toString();

                    console.error(' [*] Broadcast Consume Error: ', res);

                    this.respondToMessage(msg, response);
                }
            },
            {noAck: true}
        );
    }

}