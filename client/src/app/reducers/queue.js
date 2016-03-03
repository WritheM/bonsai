///////////////////////////////////////////////
// Queue Reducer

import { combineReducers }      from "redux";

import { Action }               from "../Constants";
import { randHexString }        from "../Utilities";

function queue(state = [], action) {
    return []; // TODO
}

const currentDefaults = {
    song: null,
    startPosition: null,
    syncToken: null
};

function current(state = currentDefaults, action) {
    switch(action.type) {
        case Action.Queue.PLAY_SONG:
            return {
                ...state,
                song: action.song,
                startPosition: action.start,
                syncToken: randHexString(8)
            };
        default:
            return {...state};
    }
}

export default combineReducers({
    current,
    queue
});