import React                from "react"

import { DumbComponent }    from "../../Components"
import PlayerVotes          from "./PlayerVotes"
import PlayerVolume         from "./PlayerVolume"
import PlayerPlayModes      from "./PlayerPlayModes"

export default class PlayerActions extends DumbComponent {

    renderVotes() {
        var voteCallbacks = {
            leaf: this.props.callbacks.leaf,
            spark: this.props.callbacks.spark
        };

        var voteProps = {
            isLeaf: false,
            isSpark: false,
            callbacks: voteCallbacks
        };

        return (
            <PlayerVotes {...voteProps} />
        );
    }

    renderVolume() {
        var volumeCallbacks = {
            muteToggle: this.props.callbacks.muteToggle
        };

        var volumeProps = {
            callbacks: volumeCallbacks,
            level: this.props.volumeLevel
        };

        return (
            <PlayerVolume {...volumeProps} />
        );
    }

    renderPlaybackModes() {
        var modeCallbacks = {
            shuffle: this.props.callbacks.shuffle,
            repeat: this.props.callbacks.repeat
        };

        var modeProps = {
            callbacks: modeCallbacks,
            isShuffle: this.props.isShuffle,
            isRepeat: this.props.isRepeat
        };

        return (
            <PlayerPlayModes {...modeProps} />
        )
    }

    render() {


        return (
            <div className="c-player-actions">
                <div className="e-votes">
                    {this.renderVotes()}
                </div>
                <div className="e-volume">
                    {this.renderVolume()}
                </div>
                <div className="e-playback-modes">
                    {this.renderPlaybackModes()}
                </div>
            </div>
        );

    }
}