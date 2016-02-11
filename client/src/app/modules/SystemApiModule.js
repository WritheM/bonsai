import ApiModule from "../../api/ApiModule";

import {
    ConnectionStates
}                           from "../Constants";

import {
    debug
}                           from "../Utilities";

import * as SystemActions   from "../../app/actions/system";

export default class SystemApiModule extends ApiModule {

    constructor(dispatch) {
        super();

        this.dispatch = dispatch;
    }

    onConnect = () => {
        debug("[SYSTEM]: Connected");

        this.dispatch(SystemActions.connectionStateChanged(ConnectionStates.CONNECTED));
    };

    onDisconnect = () => {
        debug("[SYSTEM]: Disconnected");

        this.dispatch(SystemActions.connectionStateChanged(ConnectionStates.NOT_CONNECTED));
    };

    onReconnecting = () => {
        debug("[SYSTEM]: Reconnecting...");

        this.dispatch(SystemActions.connectionStateChanged(ConnectionStates.CONNECTING));
    };

}
