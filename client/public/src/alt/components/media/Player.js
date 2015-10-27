import React from "react"

import * as Constants       from "../../Constants"
import { SmartComponent }   from "../../Components"
import YoutubePlayer        from "./YoutubePlayer"

export default class Player extends SmartComponent {

    constructor() {
        super(...arguments);

        this.selfBindMethods([
            this.updatePosition,
            this.updateIsPlaying
        ]);

        this.addActions({
            'player': Constants.Actions.PLAYER,
            'queue': Constants.Actions.QUEUE
        });

        this.addStores({
            'player': Constants.Stores.PLAYER,
            'queue': Constants.Stores.QUEUE
        });

        this.state = {
            song: null,
            start: -1,
            volume: 100,
            isPlaying: false
        };

        this._yt = null;
    }

    // Player Actions

    setPlayerPlaying(isPlaying) {

        if (!this._yt) {
            return;
        }

        if (isPlaying) {
            this._yt.play();
        } else {
            this._yt.pause();
        }

    }

    // ---

    onNewState(state) {

        if (state.player) {

            let player = state.player;

            // Non-State Reactions
            if (this.state.isPlaying != player.isPlaying) {
                this.setPlayerPlaying(player.isPlaying);
            }

            let newState = {
                isPlaying: player.isPlaying
            };

            // TODO: Conditional augments

            this.setState(newState);

        }

        if (state.queue) {

            let newState = {
                song: state.queue.current,
                start: state.queue.currentStartPosition
            };

            this.setState(newState);

        }

    }

    shouldComponentUpdate(nextProps, nextState) {

        // If the song has changed
        let noSongsYet = !nextState.song && !this.state.song;

        let songChanged =
            (nextState.song && !this.state.song) ||
            (!nextState.song && this.state.song) ||
            (!noSongsYet && nextState.song.id != this.state.song.id);

        // All the conditions that would let a full re-render
        // happen for the player.
        return songChanged || false /* TODO More Conditions */;

    }

    updatePosition(position, total) {
        this.actions.player.updatePosition(position, total);
    }

    updateIsPlaying(isPlaying) {

        // Setting this state early will abort the signal into the player.
        this.setState({
            isPlaying: isPlaying
        });

        this.actions.player.updateIsPlaying(isPlaying);
    }

    render() {

        // Clear the reference, it'll be updated later.
        this._yt = null;

        let ytProps = {

            video: this.state.song ? this.state.song.mediaCode : '',
            start: this.state.start,
            updatePosition: this.updatePosition,
            updateIsPlaying: this.updateIsPlaying

        };

        return (

            <div className="c-player">
                <div className="e-screen">
                    <YoutubePlayer {...ytProps} ref={(yt) => this._yt = yt} />
                </div>
            </div>

        );
    }
}