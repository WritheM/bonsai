//////////////////////////////////////////
// Session Actions

import {
    Action,
    LoginStates,
    RegisterStates
}                       from "../Constants";

export function updateSession(token, user) {
    return {
        type: Action.Session.UPDATE_SESSION,
        token,
        user
    };
}

export function registerUpdateView(state, message = null) {
    return {
        type: Action.Session.REGISTER_UPDATE_VIEW,
        state,
        message
    };
}

export function registerBegin() {
    return registerUpdateView(RegisterStates.OPEN);
}

export function registerCancel() {
    return registerUpdateView(RegisterStates.NONE);
}

export function register(username, displayname, email, language, password) {
    return (dispatch) => {
        dispatch(registerUpdateView(RegisterStates.REGISTERING));

        var payload = {
            username: username,
            displayname: displayname,
            email: email,
            language: language,
            password: password
        };

        // TODO: Socket IO
        var action = new Promise(function(resolve, reject) {

        })
        .then(result => {
            var state = RegisterStates.CONFIRMING;
            var message = null;

            if (!result.success) {
                state = RegisterStates.OPEN;
                message = result.message;
            }

            dispatch(registerUpdateView(state, message));
        })
        .catch(reason => {
            dispatch(registerUpdateView(RegisterStates.OPEN, reason));
        });
    };
}

export function loginUpdateView(state, message = null) {
    return {
        type: Action.Session.LOGIN_UPDATE_VIEW,
        state,
        message
    };
}

export function loginBegin() {
    return loginUpdateView(LoginStates.OPEN);
}

export function loginCancel() {
    return loginUpdateView(LoginStates.NONE);
}

export function login(username, password) {
    return (dispatch) => {
        dispatch(LoginStates.AUTHENTICATING);

        // TODO: Socket.IO
        new Promise((res, rej) => {})
            .then(result => {
                // State changes come as a broadcast, close the
                // dialog and wait.
                dispatch(loginCancel());
            })
            .catch(reason => {
                dispatch(loginUpdateView(LoginStates.OPEN, reason));
            });
    };
}

export function loginAuto() {
    return {};
}

export function logout() {
    // State changes come as a broadcast, so we will trigger
    // the logout and dispatch a blank action

    return {};
}

export function update(user, session, perms) {
    return {
        type: Action.Session.UPDATE,
        user,
        session,
        perms
    };
}