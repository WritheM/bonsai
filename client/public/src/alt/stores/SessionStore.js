import * as Constants from "../Constants"

export default class SessionStore {
    constructor() {

        let sessionActions       = this.alt.getActions(Constants.Actions.SESSION);

        this.register = {
            state: Constants.RegisterStates.NONE,
            errorMessage: null
        };

        this.login = {
            state: Constants.LoginStates.NONE,
            errorMessage: null
        };

        // Temporary list to resolve the results into for now
        this.messages = [];

        this.bindListeners({
            handleRegisterUpdateView: sessionActions.registerUpdateView,
            handleLoginUpdateView: sessionActions.loginUpdateView,

            handleLogoutOk: sessionActions.logoutOk
        });
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

    handleLogoutOk() {
        this.messages.push('Logged Out');
    }
}