import { Action } from "../Constants";

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