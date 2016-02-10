///////////////////////////////////////////////
// System Reducer

import { combineReducers }      from "redux";

import { Action, ConnectionStates }     from "../Constants";

function isReady(state = false, action) {
    switch (action.type) {
        case Action.System.INITIALIZE:
            return true;
        default:
            return false;
    }
}

function connectionState(state = ConnectionStates.NOT_CONNECTED, action) {
    switch(action.type) {
        case Action.System.CONNECTION_STATE_CHANGED:
            return action.state;
        default:
            return state;
    }
}

export default combineReducers({
    isReady,
    connectionState
});