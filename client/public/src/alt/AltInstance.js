import Alt from "alt"

import * as Constants from "./Constants"

import SystemActions from "./actions/SystemActions"
import SystemStore from "./stores/SystemStore"

/**
 * This is our "container" for the application. It's the Alt object (flux)
 * that will be provided to every view that needs to get something from
 * the system.
 */
export default class AltInstance extends Alt {
    constructor(config = {}) {
        super(config);

        this.registerActions();
        this.registerStores();

    }

    registerActions() {
        this.addActions(Constants.Actions.SYSTEM, SystemActions);
    }

    registerStores() {
        this.addStore(Constants.Stores.SYSTEM, SystemStore);
    }
}