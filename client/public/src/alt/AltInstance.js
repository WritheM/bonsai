import Alt from "altlib"

import * as Constants from "./Constants"
import { debug } from "./Utilities"

import PlayerActions from "./actions/PlayerActions"
import PlayerStore from "./stores/PlayerStore"

import SystemActions from "./actions/SystemActions"
import SystemStore from "./stores/SystemStore"

import SessionActions from "./actions/SessionActions"
import SessionStore from "./stores/SessionStore"

import UIActions from "./actions/UIActions"
import UIStore from "./stores/UIStore"

/**
 * This is our "container" for the application. It's the Alt object (flux)
 * that will be provided to every view that needs to get something from
 * the system.
 */
export default class AltInstance extends Alt {
    constructor(config = {}, socket = null, router = null) {
        super(config);

        if (!socket) {
            throw "No socket instance."
        }

        if (!router) {
            throw "No router prototype."
        }

        this._socket = socket;
        this._router = router;

        this.registerActions();
        this.registerStores();

        this.attachSocket();
    }

    get socket() {
        return this._socket;
    }

    get router() {
        return this._router;
    }

    registerActions() {
        this.addActions(Constants.Actions.PLAYER, PlayerActions);
        this.addActions(Constants.Actions.SYSTEM, SystemActions);
        this.addActions(Constants.Actions.SESSION, SessionActions);
        this.addActions(Constants.Actions.UI, UIActions);
    }

    registerStores() {
        this.addStore(Constants.Stores.PLAYER, PlayerStore);
        this.addStore(Constants.Stores.SYSTEM, SystemStore);
        this.addStore(Constants.Stores.SESSION,SessionStore);
        this.addStore(Constants.Stores.UI, UIStore);
    }

    attachSocket() {

        let systemActions = this.getActions(Constants.Actions.SYSTEM);

        this._socket.on('connect', () => {
            debug('Socket: Connect');
            systemActions.connectionStateChanged(Constants.ConnectionStates.CONNECTED);
        });

        this._socket.on('error', (e) => {
            debug('Socket: Error', e);
        });

        this._socket.on('disconnect', () => {
            debug('Socket: Disconnect');
            systemActions.connectionStateChanged(Constants.ConnectionStates.NOT_CONNECTED);
        });

        this._socket.on('reconnect', (num) => {
            debug('Socket: Reconnect', num);
        });

        this._socket.on('reconnect_attempt', () => {
            debug('Socket: Reconnect Attempt');
        });

        this._socket.on('reconnecting', () => {
            debug('Socket: Reconnecting');
            systemActions.connectionStateChanged(Constants.ConnectionStates.CONNECTING);
        });

        this._socket.on('reconnect_error', (error) => {
            debug('Socket: Reconnect Error', error);
        });

        this._socket.on('reconnect_failed', () => {
            debug('Socket: Reconnect Failed');
        });

        // Set the initial state
        if (this._socket.socket.io.readyState === "open") {
            systemActions.connectionStateChanged(Constants.ConnectionStates.CONNECTED);
        } else {
            systemActions.connectionStateChanged(Constants.ConnectionStates.NOT_CONNECTED);
        }
    }
}