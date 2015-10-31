import * as Constants from "../Constants"

export default class PlayerActions {

    play() {
        this.dispatch();
    }

    pause() {
        this.dispatch();
    }

    playPause() {
        this.dispatch();
    }

    toggleQueue() {
        this.dispatch();
    }

    toggleTheatre() {
        this.dispatch();
    }

    updatePosition(position, total) {
        this.dispatch({
            position: position,
            total: total
        });
    }

    updateIsPlaying(isPlaying) {
        this.dispatch({
            isPlaying: isPlaying
        });
    }

}
