import * as Constants   from "../Constants"
import Storage          from "../Storage"
import {debug}          from "../Utilities"

export default class SessionStore {
    constructor() {

        let systemActions        = this.alt.getActions(Constants.Actions.SYSTEM);
        let sessionActions       = this.alt.getActions(Constants.Actions.SESSION);

        this.register = {
            state: Constants.RegisterStates.NONE,
            errorMessage: null
        };

        this.login = {
            state: Constants.LoginStates.NONE,
            errorMessage: null
        };

        this.token = null;

        this.bindListeners({
            // System
            handleInitialize: systemActions.initialize,

            // Session
            handleUpdate: sessionActions.update,

            // Register
            handleRegisterUpdateView: sessionActions.registerUpdateView,

            // Login
            handleLoginUpdateView: sessionActions.loginUpdateView
        });
    }

    handleInitialize() {

    }

    handleUpdate(payload) {

        // All we need in this store is the session token
        var token = payload.session.token;
        if (token) {
            debug("Logged In With Token: " + token);
        } else {
            debug("Logged Out");
        }

        this.token
            = Storage.sessionToken
            = payload.session.token;
    }

    handleRegisterUpdateView(payload) {
        if (payload.state) {
            this.register.state = payload.state;
        }

        if (payload.message) {
            this.register.errorMessage = payload.message;
        }
    }

    handleLoginUpdateView(payload) {
        if (payload.state) {
            this.login.state = payload.state;
        }

        if (payload.message) {
            this.login.errorMessage = payload.message;
        }
    }
}