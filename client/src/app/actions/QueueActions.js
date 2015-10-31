import * as Constants from "../Constants"

/**
 * Actions that manipulate / respond to the queue (which includes the currently playing song)
 */
export default class QueueActions {

    /**
     * Play the previous song.
     */
    prev() {
        // TODO: Dispatch Request to Backend
        this.dispatch();
    }

    /**
     * Play the next song.
     */
    next() {
        // TODO: Dispatch Request to Backend
        this.dispatch();
    }

    /**
     * Play a specific song, optionally at a starting point specified.
     * @param song The song object to play.
     * @param start The time in seconds to start playing at.
     */
    playSong(song, start) {

        let startPos = start || -1;

        this.dispatch({
            song: song,
            start: startPos
        });

    }

    /**
     * Update the queue with a list of new songs.
     * @param songsInQueue array of songs in the queue.
     */
    updateQueue(songsInQueue) {
        this.dispatch({
            songs: songsInQueue
        });
    }

    /**
     * Request the queue be refreshed.
     */
    refreshQueue() {
        // TODO: Dispatch Request to Backend
        this.dispatch();
    }

}

