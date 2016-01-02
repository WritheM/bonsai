// TODO - Expand This

import TrackedElement from '../TrackedElement';

class Connection extends TrackedElement {
    constructor() {
        super(...arguments);
    }

    get context() {
        return {
            connection: this.id
        };
    }

    send(event, data) {
        this.emitter.emit('send', event, data);
    }
}

class Session extends TrackedElement {
    constructor() {
        super(...arguments);
    }
}

class User extends TrackedElement {

}

/**
 * Prefix / Class Mapping - See Tracker.js for details.
 */
let mapping = {
    'connection': Connection,
    'session': Session,
    'user': User
};

export {
    Session,
    mapping
}
