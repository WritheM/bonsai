import Alt from "alt"

import * as Constants from "./constants"

// Actions
import SystemActions from "./actions/system"

// Stores
import SystemStore from "./stores/system"

class BonsaiAlt extends Alt {
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

export default BonsaiAlt;