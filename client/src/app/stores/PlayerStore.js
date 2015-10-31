import * as Constants from "../Constants"

/**
 * State & State Mutations for the player.
 */
export default class PlayerStore {
    constructor() {

        let playerActions        = this.alt.getActions(Constants.Actions.PLAYER);

        this.bindListeners({
            handleUpdatePosition: playerActions.updatePosition,
            handleUpdateIsPlaying: playerActions.updateIsPlaying,
            handlePlay: playerActions.play,
            handlePause: playerActions.pause,
            handlePlayPause: playerActions.playPause
        });

        this.position = 0;
        this.total = 0;
        this.isPlaying = false;
    }

    handleUpdatePosition(payload) {
        // TODO: Should the rounding go here, or in the UI? are the fractions useful?
        this.position = payload.position;
        this.total = payload.total;
    }

    handleUpdateIsPlaying(payload) {
        this.isPlaying = payload.isPlaying;
    }

    handlePlay() {
        this.isPlaying = true;
    }

    handlePause() {
        this.isPlaying = false;
    }

    handlePlayPause() {
        this.isPlaying = !this.isPlaying;
    }
}
