///////////////////////////////////////////////
// Player Reducer

import { combineReducers }      from "redux";

import { Action }               from "../Constants";

const playerDefaults = {
    position: 0,
    total: 0,
    isPlaying: false
};

export default function(state = playerDefaults, action) {
    switch(action.type) {
        case Action.Player.PLAY:
            return {
                ...state,
                isPlaying: true
            };
        case Action.Player.PAUSE:
            return {
                ...state,
                isPlaying: false
            };
        case Action.Player.PLAY_PAUSE:
            return {
                ...state,
                isPlaying: !state.isPlaying
            };
        case Action.Player.UPDATE_POSITION:
            return {
                ...state,
                position: action.position,
                total: action.total
            };
        default:
            return {...state};
    }
}
