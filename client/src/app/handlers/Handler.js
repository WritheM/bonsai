export default class Handler {
    constructor(flux, socket) {
        if (!flux) {
            throw new Error('Handlers must be instantiated with a flux instance.');
        }

        this.flux = flux;
        this.socket = socket;
        this._routes = {};
    }

    attach() {
        // No-Op
        // TODO: Not sure if i like this approach
    }

    detach() {
        // No-Op
        // TODO: Not sure if i like this approach
        this._routes = {}; // Clear the registry
    }

    on(message, callback) {
        this._routes[message] = callback.bind(this);
    }

    off(message) {
        if (this._routes[message]) {
            delete this._routes[message];
        }
    }

    invoke(route, data) {
        if (this._routes[route]) {
            this._routes[route](data);
            return true;
        }

        return false;
    }

    getActions(key) {
        return this.flux.getActions(key);
    }
}
