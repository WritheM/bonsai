import { Action } from "../Constants";

export function prev() {
    return {};
}

export function next() {
    return {};
}

export function playSong(song, start = null) {
    return {
        type: Action.Queue.PLAY_SONG,
        song,
        start
    };
}