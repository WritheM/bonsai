import * as Constants   from "../Constants"
import Storage          from "../Storage"

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

            // Register
            handleRegisterUpdateView: sessionActions.registerUpdateView,

            // Login
            handleLoginUpdateView: sessionActions.loginUpdateView,
            handleLoginOk: sessionActions.loginOk,

            handleLogoutOk: sessionActions.logoutOk
        });
    }

    handleInitialize() {

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

    handleLoginOk(payload) {
        this.token
            = Storage.sessionToken
            = payload.sessionToken;
    }

    handleLogoutOk() {
        this.token
            = Storage.sessionToken
            = null;
    }
}