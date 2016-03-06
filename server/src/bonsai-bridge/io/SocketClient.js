import { EventEmitter2 } from "eventemitter2";

import { debug } from "../utilities";

// This is temporary to map the client events to the new scheme
// It should go away once we've refactored the client following the
// refactor for the backend

var mapping = {
    "Session:register": "client.user.register",
    "Session:login" : "client.session.login",
    "Session:loginToken": "client.session.login-token",
    "Session:logout": "client.session.logout"
};

function mapEvent(event) {
    return mapping[event] || event;
}

function reportRPC(data) {
    // TODO: Anonymize Before Production
    debug(' [<] Socket ', data);
    return data;
}

function reportRPCResult(result) {
    debug(' [>] Socket ', result);
    return result;
}

export default class SocketClient {
    constructor(socket, connection) {
        this.emitter = new EventEmitter2();
        this.socket = socket;
        this.connection = connection;

        // If the socket closes, kill the client
        this.socket.on('disconnect', () => this.die());

        // If the connection signals to disconnect, kill
        // the client
        this.connection.on('disconnect', () => this.die());

        // Pass data to the socket
        this.connection.on('send', (event, data) => this.sendToClient(event, data));

        // Handle RPC calls
        this.socket.on('rpc', (data, callback) => this.dispatchRPC(data, callback));
    }

    sendToClient(event, data) {
        let payload = {event:event, data:data};
        // TODO: Debug, Remove/Anonymize Before Launch
        console.log(' [>] Broadcast', payload);

        this.socket.emit("broadcast", payload);
    }

    dispatchRPC(data, callback) {

        reportRPC(data);

        let event = data.path;
        let payload = data.data;

        // TEMP
        event = mapEvent(event);

        this.connection
            .rpc(event, payload)
            // The reporting function will swallow the "error"
            // and allow us to continue since we're sending
            .then(reportRPCResult, reportRPCResult)
            .then(callback);
    }

    on(event, callback) {
        this.emitter.on(event, callback);
    }

    off(event, callback) {
        this.emitter.off(event, callback);
    }

    die() {
        this.emitter.emit('disconnect');
    }
}
