import React            from "react";
import { connect }     from "react-redux";

import * as QueueActionCreators     from "../../actions/queue";
import * as PlayerActionCreators    from "../../actions/player";

import PlayerControls               from "./PlayerControls"
import PlayerProgress               from "./PlayerProgress"
import PlayerActions                from "./PlayerActions"

/**
 * The smart component that coordinates the player bar at the bottom of the screen.
 */
class PlayerBar extends React.Component {

    get currentSong() {
        let { queue } = this.props;

        if (!queue.song) {
            return {
                title: '',
                artist: ''
            };
        } else {
            return {
                ...this.props.queue.song
            };
        }
    }

    get playerState() {
        let { player } = this.props;

        return {
            isPlaying: player.isPlaying,
            current: player.position,
            total: player.total
        };
    }

// Controls

    onBackPressed = () => {
        this.props.dispatch(QueueActionCreators.prev());
    };

    onNextPressed = () => {
        this.props.dispatch(QueueActionCreators.next());
    };

    onPlayPausePressed = () => {
        this.props.dispatch(PlayerActionCreators.playPause());
    };

    onQueuePressed = () => {
        // TODO: Wire into Action
    };

    onTheatrePressed = () => {
        // TODO: Wire into Action
    };

    // Actions

    onLeafPressed = () => {
        // TODO: Wire into Action
    };

    onSparkPressed = () => {
        // TODO: Wire into Action
    };

    onMuteTogglePressed = () => {
        // TODO: Wire into Action
    };

    onShufflePressed = () => {
        // TODO: Wire into Action
    };

    onRepeatPressed = () => {
        // TODO: Wire into Action
    };

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
            isPlaying: this.playerState.isPlaying,
            isQueueOpen: false,
            isTheatreOpen: false
        };

        return (
            <PlayerControls {...controlProps} />
        );
    }

    renderProgress() {

        var progressProps = {
            title: this.currentSong.title,
            artist: this.currentSong.artist,
            current: this.playerState.current,
            total: this.playerState.total
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

export default connect(state => ({
    player: state.player,
    queue: state.queue
}))(PlayerBar);
