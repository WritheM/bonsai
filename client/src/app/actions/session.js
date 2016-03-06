//////////////////////////////////////////
// Session Actions

import {
    Action,
    LoginStates,
    RegisterStates
}                       from "../Constants";

import {
    debug,
    ensureString
}                       from "../Utilities";

import {
    apiCall,
    apiCallback
}                       from "./common";

export function updateSession(token, user) {
    return {
        type: Action.Session.UPDATE_SESSION,
        token,
        user
    };
}

export function registerUpdateView(state, message = null) {
    ensureString("state", state);
    ensureString("message", message, true);

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

export function registerWaiting() {
    return registerUpdateView(RegisterStates.REGISTERING);
}

export function apiRegister(
    username,
    displayname,
    email,
    language,
    password,
    onPromise = null
) {
    return apiCallback(
        (context) => {
            let { api } = context;

            let operation = api
                .session
                .register(
                    username,
                    displayname,
                    email,
                    language,
                    password
                );

            if (typeof onPromise === "function") {
                operation = onPromise(operation);
            }
        }
    );
}

export function loginUpdateView(state, message = null) {
    ensureString("state", state);
    ensureString("message", message, true);

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

export function loginWaiting() {
    return loginUpdateView(LoginStates.AUTHENTICATING);
}

export function apiLogin(
    username,
    password,
    onPromise = null) {

    return apiCallback(
        (context) => {
            let { api } = context;

            let operation = api
                .session
                .login(username, password);

            if (typeof onPromise === "function") {
                operation = onPromise(operation);
            }
        }
    );
}

export function apiLogout() {
    return apiCall(
        "session",
        "logout",
        [],
        null,
        (error) => {
            debug("Logout Failure", error);
        }
    );
}

export function update(user, session, perms) {
    return {
        type: Action.Session.UPDATE,
        user,
        session,
        perms
    };
}