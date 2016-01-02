import {EventEmitter2} from 'eventemitter2';

/**
 * Base Class for Tracked Elements
 */
export default class TrackedElement {
    constructor(tracker, id, onDeathCallback) {
        this.tracker = tracker;
        this.id = id;

        this.onDeathCallback = onDeathCallback;

        this.emitter = new EventEmitter2();
    }

    rpc(event, data) {
        var message = {
            path: event,
            context: this.context,
            payload: data
        };

        return this
            .tracker
            .client
            .rpc(event, message);
    }

    broadcast(event, data) {
        var message = {
            path: event,
            context: this.context,
            payload: data
        };

        return this
            .tracker
            .client
            .broadcast(event, message);
    }

    get context() {
        return {}
    }

    on(event, callback) {
        this.emitter.on(event, callback);
    }

    off(event, callback) {
        this.emitter.off(event, callbac);
    }

    kill() {
        this.onDeathCallback();
    }
}
