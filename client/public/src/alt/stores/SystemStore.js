import * as Constants from "../Constants"

export default class SystemStore {
    constructor() {

        let systemActions       = this.alt.getActions(Constants.Actions.SYSTEM);

        this.isReady            = false;
        this.connectionState    = Constants.ConnectionStates.NOT_CONNECTED;

        this.bindListeners({
            handleInitialize: systemActions.initialize
        });
    }

    handleInitialize() {
        this.isReady = true;
    }
}