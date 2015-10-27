import React            from "react"

import * as Constants           from "../../Constants"
import { SmartComponent }       from "../../Components"

import PlayerControls       from "./PlayerControls"
import PlayerProgress       from "./PlayerProgress"
import PlayerActions        from "./PlayerActions"

/**
 * The smart component that coordinates the player bar at the bottom of the screen.
 */
export default class PlayerBar extends SmartComponent {

    constructor() {
        super(...arguments);

        this.addActions({
            // TODO: Add Actions
            'player': Constants.Actions.PLAYER,
            'queue': Constants.Actions.QUEUE
        });

        this.addStores({
            // TODO: Add Stores
            'player': Constants.Stores.PLAYER,
            'queue': Constants.Stores.QUEUE
        });

        this.selfBindMethods([
            // Control Callbacks
            this.onBackPressed,
            this.onPlayPausePressed,
            this.onNextPressed,
            this.onQueuePressed,
            this.onTheatrePressed,
            // Action Callbacks
            this.onLeafPressed,
            this.onSparkPressed,
            this.onMuteTogglePressed,
            this.onShufflePressed,
            this.onRepeatPressed
        ]);

        this.state = {
            song: {
                title: '',
                artist: ''
            },
            player: {
                isPlaying: false,
                current: 0,
                total: 1
            }
        };
    }


    onNewState(state) {

        if (state.player) {
            this.setState({
                player: {
                    isPlaying: state.player.isPlaying,
                    current: state.player.position,
                    total: state.player.total
                }
            });
        }

        if (state.queue) {

            let title = state.queue.current ? state.queue.current.title : '';
            let artist = state.queue.current ? state.queue.current.artist : '';

            this.setState({
                song: {
                    title: title,
                    artist: artist
                }
            })
        }
    }

// Controls

    onBackPressed() {
        this.actions.queue.prev();
    }

    onPlayPausePressed() {
        this.actions.player.playPause();
    }

    onNextPressed() {
        this.actions.queue.next();
    }

    onQueuePressed() {
        // TODO: Wire into Action
    }

    onTheatrePressed() {
        // TODO: Wire into Action
    }

    // Actions

    onLeafPressed() {
        // TODO: Wire into Action
    }

    onSparkPressed() {
        // TODO: Wire into Action
    }

    onMuteTogglePressed() {
        // TODO: Wire into Action
    }

    onShufflePressed() {
        // TODO: Wire into Action
    }

    onRepeatPressed() {
        // TODO: Wire into Action
    }

    renderControls() {
        var controlCallbacks = {
            back: this.onBackPressed,
            playPause: this.onPlayPausePressed,
            next: this.onNextPressed,
            queue: this.onQueuePressed,
            theatre: this.onTheatrePressed
        };

        var controlProps = {
            callbacks: controlCallbacks,
            isPlaying: this.state.player.isPlaying,
            isQueueOpen: false,
            isTheatreOpen: false
        };

        return (
            <PlayerControls {...controlProps} />
        );
    }

    renderProgress() {

        var progressProps = {
            title: this.state.song.title,
            artist: this.state.song.artist,
            current: this.state.player.current,
            total: this.state.player.total
        };

        return (
            <PlayerProgress {...progressProps} />
        );
    }

    renderActions() {
        var actionCallbacks = {
            leaf: this.onLeafPressed,
            spark: this.onSparkPressed,
            muteToggle: this.onMuteTogglePressed,
            shuffle: this.onShufflePressed,
            repeat: this.onRepeatPressed
        };

        var actionProps = {
            callbacks: actionCallbacks,
            volumeLevel: 70
        };

        return (
            <PlayerActions {...actionProps} />
        );
    }

    render() {

        return (
            <div className="c-player-bar">
                <div className="e-controls">
                    {this.renderControls()}
                </div>
                <div className="e-progress">
                    {this.renderProgress()}
                </div>
                <div className="e-actions">
                    {this.renderActions()}
                </div>
            </div>
        );

    }
}
