///////////////////////////////////////////////
// Session Reducer

import { combineReducers }      from "redux";

import {
    Action,
    LoginStates,
    RegisterStates
}                               from "../Constants";

import Storage                  from "../Storage"

function token(state = null, action) {
    if (state == null) {
        state = Storage.sessionToken;
    }

    switch(action.type) {
        case Action.Session.UPDATE:
            Storage.sessionToken = action.session;
            return action.session;
        default:
            return state; // immutable string
    }
}

const registerDefaults = {
    state: RegisterStates.NONE,
    errorMessage: null
};

function isRegisterClosable(state) {
    return state.state == RegisterStates.OPEN ||
           state.state == RegisterStates.CONFIRMING;
}

function register(state = registerDefaults, action) {
    switch(action.type){
        case Action.UI.EXIT_OVERLAY:
            return isRegisterClosable(state)
                ? {
                    ...state,
                    state: RegisterStates.NONE
                }
                : {...state};
        case Action.Session.REGISTER_UPDATE_VIEW:
            return {
                state: action.state,
                errorMessage: action.message
            };
        default:
            return {...state};
    }
}

const loginDefaults = {
    state: LoginStates.NONE,
    errorMessage: null
};

function isLoginClosable(state) {
    return state.state == LoginStates.OPEN;
}

function login(state = loginDefaults, action) {
    switch(action.type) {
        case Action.UI.EXIT_OVERLAY:
            return isLoginClosable(state)
                ? {
                    ...state,
                    state: LoginStates.NONE
                }
                : {...state};
        case Action.Session.LOGIN_UPDATE_VIEW:
            return {
                state: action.state,
                errorMessage: action.message
            };
        default:
            return {...state};
    }
}

export default combineReducers({
    token,
    login,
    register
});
