import * as Constants from "../Constants"
import * as Utilities from "../Utilities"

export default class QueueStore {

    constructor() {

        let queueActions        = this.alt.getActions(Constants.Actions.QUEUE);

        this.bindListeners({
            handlePlaySong: queueActions.playSong,
            handleUpdateQueue: queueActions.updateQueue
        });

        // The songs in the queue
        this.queue = [

        ];

        // The current song playing
        this.current = null;

        // The start position for the current song, should only matter
        // when the song is being worked on.
        this.currentStartPosition = -1;
    }

    handlePlaySong(payload) {

        if (this.queue.length > 0 && this.queue[0].id == payload.song.id) {
            // Remove the leading item in the queue because it's the
            // song that's playing.
            this.queue.shift();
        }

        let songId = payload.song ? payload.song.id : '??';

        Utilities.debug('Play Song: ' + songId + ', ' + payload.start + ' start.');

        this.current = payload.song;
        this.currentStartPosition = payload.start;
    }

    handleUpdateQueue(payload) {
        this.queue = payload.songs;
    }

}
