import io from "socket.io-client";

const configDefaults = {
    host: "localhost",
    port: 1337
};

function constructSocket(config) {
    let url = "http://" + config.host + ":" + config.port + "/";

    return io(url);
}

export default class BonsaiApi {
    constructor(config) {
        this.modules = [];

        this.config = {
            ...configDefaults,
            ...config
        };

        this.socket = constructSocket(this.config);
    }

    get isConnected() {
        return this.socket.io.readyState === "open";
    }

    addModule(module) {
        if (this.modules.some(x => x === module)) {
            throw new Error(`Cannot add module, it's already registered to this instance.`);
        }

        this.modules.push(module);

        module.attach(this);
    }

    removeModule(module) {
        if (!this.modules.some(x => x === module)) {
            throw new Error(`Cannot remove module, it isn't registered to this instance.`);
        }

        module.detach(this);

        this.modules = this.modules.filter(x => x === module);
    }

    clearModules() {
        for(let module of this.modules) {
           module.detach(this);
        }

        this.modules = [];
    }

    on(event, callback) {
        if (!this.socket) {
            return;
        }

        this.socket.on(event, callback);
    }

    off(event, callback) {
        if (!this.socket) {
            return;
        }

        this.socket.off(event, callback);
    }

    send(path, data) {
        if (!this.socket || this.socket.io.readyState !== "open") {
            return Promise.reject(
                `Error sending message to socket. The socket is not ready.`
            );
        }

        var payload = {path, data};

        return new Promise((resolve, reject) => {
            this.socket.emit("rpc", payload, function(response) {
                if (response.success) {
                    resolve(response);
                }
                else {
                    reject(response);
                }
            });
        });
    }
}