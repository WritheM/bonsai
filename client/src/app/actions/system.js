import { Action } from "../Constants";

export function initialize() {
    return { type: Action.System.INITIALIZE };
}

export function connectionStateChanged(state) {
    return {
        type: Action.System.CONNECTION_STATE_CHANGED,
        state: state
    };
}

export function connectionError(error) {
    return {
        type: Action.System.CONNECTION_ERROR,
        error: error
    };
}
