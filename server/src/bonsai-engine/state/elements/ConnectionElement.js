import { StateEvents }          from "../constants";
import * as connectionActions   from "../actions/connections";

import TrackedElement           from "../TrackedElement";

function findInState(state, id) {
    return state.connections[id] || {
            id: id,
            session: null,
            user: null
        };
}

export default class ConnectionElement extends TrackedElement {
    constructor() {
        super(...arguments);

        // Connections are not always fully tracked and may be empty shims
        // TODO: Unsure about this... we'll see how it pans out, perhaps pull it out into a seperate type of tracked element?
        this.tracked = false;

        this.store.dispatch(connectionActions.open(this.id));
    }

    track() {
        this.tracked = true;
        this.store.dispatch(connectionActions.open(this.id));
    }

    send(event, data) {
        this.emitter.emit('send', event, data);
    }

    kill() {
        if (this.tracked) {
            this.store.dispatch(connectionActions.close(this.id));
        }

        super.kill();
    }

    get context() {
        var info = findInState(this.state, this.id);

        return {
            connection: info.id,
            session: info.session,
            user: info.user
        };
    }

    // ---- API:

    attachSession(session, user) {
        this.broadcast(StateEvents.Connection.ATTACH, {
            session,
            user
        });
    }

    detachSession() {
        this.broadcast(StateEvents.Connection.DETACH, {});
    }
}