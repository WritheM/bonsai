import * as connectionActions from "../actions/connections";

import {
    createRoutes
}                       from "../../routing";

export default class ConnectionController {
    constructor(store) {
        this.store = store;
        this.routes = createRoutes(this, {
            "state.connection.attach": [this.attach, -1000],
            "state.connection.detach": [this.detach, -1000]
        });
    }

    async attach(message) {
        var { payload, context } = message;
        var { session, user } = payload;
        var { connection } = context;

        this.store.dispatch(connectionActions.attachSession(connection, session, user))
    }

    async detach(message) {
        var { payload, context } = message;
        var { connection } = context;

        this.store.dispatch(connectionActions.detachSession(connection));
    }
}