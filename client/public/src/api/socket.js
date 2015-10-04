import io from "socket.io-client";
import Backbone from "backbone";

export var socket = io("http://localhost:1337");
window.socket = socket;

export var Collection = Backbone.Collection.extend({
    sync: function(method, model, options) {
        _.defaults(options || (options = {}));
        var params = {path:this.url+"."+method};
        params.data = options.attrs || {};
        if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
            params.data = options.attrs || model.toJSON(options);
        }

        socket.emit("rpc", params, function(response) {
            if (response.status == "ok") {
                console.log("debug collection: success");
                options.success(response.data);
            }
            else {
                console.log("debug collection: error");
                options.error(response.status)
            }
        });
    }
});

export var Model = Backbone.Model.extend({
    sync: function(method, model, options) {
        _.defaults(options || (options = {}));
        var params = {path:this.url+"."+method};
        params.data = options.attrs || {};
        if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
            params.data = options.attrs || model.toJSON(options);
        }

        socket.emit("rpc", params, function(response) {
            if (response.status == "ok") {
                console.log("debug model: success", response);
                options.success(response.status);
            }
            else {
                console.log("debug model: error", response);
                options.error(response.status)
            }
        });
    }
});

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