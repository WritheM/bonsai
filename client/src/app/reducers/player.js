///////////////////////////////////////////////
// Player Reducer

import { combineReducers }      from "redux";

import {
    Action,
    PlayerModes
}                               from "../Constants";

const playerDefaults = {
    playback: {
        position: 0,
        total: 0,
        isPlaying: false
    },
    display: {
        mode: PlayerModes.NORMAL,
        location: {
            x: 0,
            y: 0
        }
    }
};

function playback(state = playerDefaults.playback, action) {
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
        case Action.Queue.PLAY_SONG:
            return {
                ...state,
                isPlaying: true
            };
        default:
            return {...state};
    }
}

function display(state = playerDefaults.display, action) {
    // Since we have nested elements here, we will
    // pre clone this object so we deal with nested
    // immutability.
    state = {
        ...state,
        location: displayLocation(state.location, action)
    };

    switch(action.type) {
        case Action.Player.UPDATE_MODE:
            return {
                ...state,
                mode: action.mode
            };
        default:
            return {...state};
    }
}

function displayLocation(state = playerDefaults.display.location, action) {
    switch(action.type) {
        case Action.Player.UPDATE_LOCATION:
            return {
                x: action.x,
                y: action.y
            };
        default:
            return {...state}
    }
}

export default combineReducers({
    playback,
    display
});
