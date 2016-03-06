import ApiModule from "../../api/ApiModule";

import {
    Api
}                           from "../Constants";

import {
    debug
}                           from "../Utilities";

import * as SessionActions   from "../actions/session";

export default class SessionApiModule extends ApiModule {

    constructor(dispatch) {
        super();

        this.dispatch = dispatch;
    }

    get key() {
        return "session";
    }

    onBroadcast = (payload) => {

        let { event, data } = payload;

        if (event == "Session:Set") {
            this.dispatch(SessionActions.update(
                data.user,
                data.session,
                null
            ));

            return;
        }

    };

    /**
     * API: Session - Register
     *
     * Register a new user with the provided values.
     *
     * @param username
     * @param displayname
     * @param email
     * @param language
     * @param password
     * @returns {*}
     */
    register(
        username,
        displayname,
        email,
        language,
        password
    ) {
        var payload = {
            username,
            displayname,
            email,
            language,
            password
        };

        return this.send(
            Api.Session.REGISTER,
            payload
        );
    }

    /**
     * API: Session - Login
     *
     * Login with a provided set of credentials.
     *
     * @param username
     * @param password
     * @returns {*}
     */
    login(
        username,
        password
    ) {
        var payload = {
            username,
            password
        };

        return this.send(
            Api.Session.LOGIN,
            payload
        );
    }

    /**
     * API: Session - Login Token
     *
     * Login with a provided token.
     *
     * @param token
     * @returns {*}
     */
    loginToken(token) {
        var payload = {
            token
        };

        return this.send(
            Api.Session.LOGIN_TOKEN,
            payload
        );
    }

    /**
     * API: Session - Logout
     *
     * Logout of the current session.
     *
     * @returns {*}
     */
    logout() {
        return this.send(
            Api.Session.LOGOUT,
            {}
        );
    }

}
