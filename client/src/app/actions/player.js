import {
    Action,
    PlayerModes
} from "../Constants";

export function play() {
    return { type: Action.Player.PLAY };
}

export function pause() {
    return { type: Action.Player.PAUSE };
}

export function playPause() {
    return { type: Action.Player.PLAY_PAUSE };
}

export function updateIsPlaying(isPlaying) {
    return isPlaying ? play() : pause();
}

export function updatePosition(position, total) {
    return {
        type: Action.Player.UPDATE_POSITION,
        position,
        total
    };
}

export function updateMode(mode) {
    return {
        type: Action.Player.UPDATE_MODE,
        mode
    };
}

export function toggleMode() {
    return (dispatch, getState) => {
        let state = getState();

        switch(state.player.display.mode) {
            case PlayerModes.MIN:
                dispatch(updateMode(PlayerModes.NORMAL));
                break;
            case PlayerModes.NORMAL:
                dispatch(updateMode(PlayerModes.MIN));
                break;
            default:
                /* noop */
        }
    };
}

export function updateLocation(x, y) {
    return {
        type: Action.Player.UPDATE_LOCATION,
        x,
        y
    };
}

export function nextAnchor() {
    return { type: Action.Player.NEXT_ANCHOR };
}