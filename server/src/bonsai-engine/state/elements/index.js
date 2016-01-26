// TODO - Expand This

import * as connectionActions   from "../actions/connections";

import TrackedElement           from '../TrackedElement';

// Elements
import ConnectionElement        from "./ConnectionElement";


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
    'connection': ConnectionElement,
    'session': Session,
    'user': User
};

export {
    Session,
    mapping
}
