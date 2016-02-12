import {
    createRoutes
}                       from "bonsai-engine/routing";

export default class ConnectionEmitController {
    constructor(tracker) {
        this.tracker = tracker;
        this.routes = createRoutes(this, {
            "state.connection.attach": [this.attach, -1000],
            "state.connection.detach": [this.detach, -1000]
        });
    }

    async attach(message) {
        var { payload, context } = message;
        var { session, user } = payload;
        var { connection } = context;

        this.tracker
            .connection(connection)
            .send("Session:Set", {
                user: user,
                session: session
            });
    }

    async detach(message) {
        var { payload, context } = message;
        var { connection } = context;

        this.tracker
            .connection(connection)
            .send("Session:Set", {
                user: 0,
                session: null
            });
    }
}
