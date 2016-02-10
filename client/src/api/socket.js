import io from "socket.io-client";

export var socket = io("http://localhost:1337");
window.socket = socket;

export function call(method, data) {
    return new Promise(function(success, fail) {
        var payload = {path: method, data: data};
        socket.emit("rpc", payload, function(response) {
            if (response.status === "ok") {
                success(response.data);
            }
            else {
                fail(response.status);
            }
        });
    });
}

export function on() {
    return socket.on(...arguments);
}