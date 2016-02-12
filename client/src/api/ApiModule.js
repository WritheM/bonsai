function attachHandler(instance, event, handler) {
    if (handler) {
        instance.api.on(event, handler);
    }
}

function detachHandler(instance, event, handler) {
    if (handler) {
        instance.api.off(event, handler);
    }
}

function mount(instance) {

    let className   = instance.__proto__.constructor.name;
    let key         = instance.key;

    if (instance.api[key]) {
        throw new Error(
            `Unable to mount '${className}' at '${key}', the key already exists.`
        );
    }

    instance.api[key] = instance;
}

function unmount(instance) {

    let className   = instance.__proto__.constructor.name;
    let key         = instance.key;

    if (!instance.api[key]) {
        throw new Error(
            `Unable to unmount '${className}' from '${key}', there is no value at the provided key.`
        );
    }

    if (instance.api[key] !== instance) {
        throw new Error(
            `Unable to unmount '${className}' from '${key}', the value isn't this instance.`
        );
    }

    delete instance.api[key];
}

export default class ApiModule {

    /**
     * A Key Property, instructs the
     * @virtual
     * @returns {null}
     */
    get key() {
        return null;
    }

    /**
     * Returns a boolean denoting if we're attached to an api.
     * @returns {boolean}
     */
    get isAttached() {
        return !!this.api;
    }

    attach(api) {
        this.api = api;

        attachHandler(this, "rpc", this.onRpc);
        attachHandler(this, "broadcast", this.onBroadcast);

        attachHandler(this, "connect", this.onConnect);
        attachHandler(this, "disconnect", this.onDisconnect);

        attachHandler(this, "reconnect", this.onReconnect);
        attachHandler(this, "reconnect_attempt", this.onReconnectAttempt);
        attachHandler(this, "reconnect_error", this.onReconnectError);
        attachHandler(this, "reconnect_failed", this.onReconnectFailed);

        attachHandler(this, "error", this.onError);

        if (this.key) {
            mount(this);
        }

        if (this.api.isConnected && this.onConnect) {
            this.api.onConnect();
        }
    }

    detach() {

        if (this.key) {
            unmount(this);
        }

        detachHandler(this, "rpc", this.onRpc);
        detachHandler(this, "broadcast", this.onBroadcast);

        detachHandler(this, "connect", this.onConnect);
        detachHandler(this, "disconnect", this.onDisconnect);

        detachHandler(this, "reconnect", this.onReconnect);
        detachHandler(this, "reconnect_attempt", this.onReconnectAttempt);
        detachHandler(this, "reconnect_error", this.onReconnectError);
        detachHandler(this, "reconnect_failed", this.onReconnectFailed);

        detachHandler(this, "error", this.onError);

        this.api = null;
    }

    send(path, payload) {
        if (!this.api) {
            return Promise.reject("Module is not attached to an api.");
        }

        return this
            .api
            .send(path, payload);
    }

    dispatchBroadcast(mapping, payload) {
        let { event, data } = payload;
        let handler = mapping[event];

        if (handler) {
            handler.call(this, event, data);
        }
    }
}
