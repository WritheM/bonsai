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
            Storage.sessionToken = action.token;
            return action.token;
        default:
            return state; // immutable string
    }
}

const registerDefaults = {
    state: RegisterStates.NONE,
    errorMessage: null
};

function register(state = registerDefaults, action) {
    switch(action.type){
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

function login(state = loginDefaults, action) {
    switch(action.type){
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
