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
        this.props.dispatch(PlayerActionCreators.toggleMode());
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

        let { playState } = this.props;

        var controlCallbacks = {
            back: this.onBackPressed,
            playPause: this.onPlayPausePressed,
            next: this.onNextPressed,
            queue: this.onQueuePressed,
            theatre: this.onTheatrePressed
        };

        var controlProps = {
            callbacks: controlCallbacks,
            isPlaying: playState.isPlaying,
            isQueueOpen: false,
            isTheatreOpen: false
        };

        return (
            <PlayerControls {...controlProps} />
        );
    }

    renderProgress() {

        let { song, playState } = this.props;

        var progressProps = {
            id: song.id,
            title: song.title,
            artist: song.artist,

            current: playState.current,
            total: playState.total
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

const mapStateToProps = (state) => {
    let current = state.queue.current;
    let playback = state.player.playback;

    let song = current.song
        ? current.song
        : {
            title: "",
            artist: ""
        };

    return {
        song,
        playState: {
            current: playback.position,
            total: playback.total,
            isPlaying: playback.isPlaying
        }
    };
};

export default connect(
    mapStateToProps
)(PlayerBar);
