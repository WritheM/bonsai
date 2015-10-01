export default class SystemActions {
    /**
     * Action: Initialize
     *
     * Called when the application initializes.
     */
    initialize() {
        this.dispatch();
    }

    /**
     * Action: Connection State Changed
     *
     * Called when the connection state of the application is changed.
     * @param newState The new Connection State for the application.
     */
    connectionStateChanged(newState) {
        this.dispatch({
            newState: newState
        });
    }
}