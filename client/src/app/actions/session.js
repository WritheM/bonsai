//////////////////////////////////////////
// Session Actions

import {
    Action,
    LoginStates,
    RegisterStates
}                       from "../Constants";

import {
    ensureString
}                       from "../Utilities";

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