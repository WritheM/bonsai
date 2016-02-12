import ApiModule from "../../api/ApiModule";

import {
    ConnectionStates
}                           from "../Constants";

import {
    debug
}                           from "../Utilities";

import {
    SessionActions,
    SystemActions
}                           from "../actions";

export default class SystemApiModule extends ApiModule {

    constructor(dispatch, getState) {
        super();

        this.dispatch = dispatch;
        this.getState = getState;
    }

    onRpc = (payload) => {
        let { path, data } = payload;

        console.group(`>> RPC ${path}`);
        console.info("Payload Data", data);
        console.groupEnd();
    };

    onBroadcast = (payload) => {
        let { event, data } = payload;

        console.group(`<< BROADCAST ${event}`);
        console.info("Payload Data", data);
        console.groupEnd();
    };

    onConnect = () => {
        debug("[SYSTEM]: Connected");

        this.dispatch(SystemActions.connectionStateChanged(ConnectionStates.CONNECTED));

        this.reconnectIfToken();
    };

    onDisconnect = () => {
        debug("[SYSTEM]: Disconnected");

        this.dispatch(SystemActions.connectionStateChanged(ConnectionStates.NOT_CONNECTED));
    };

    onReconnecting = () => {
        debug("[SYSTEM]: Reconnecting...");

        this.dispatch(SystemActions.connectionStateChanged(ConnectionStates.CONNECTING));
    };

    reconnectIfToken() {
        let { session } = this.getState();

        if (session.token && this.isAttached) {

            this.api
                .session
                .loginToken(session.token);

        }
    }

}
