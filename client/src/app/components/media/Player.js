import React            from "react";
import { connect }      from "react-redux";

import * as PlayerActionCreators from "../../actions/player";

import YoutubePlayer        from "./YoutubePlayer"

class Player extends React.Component {

    constructor() {
        super(...arguments);

        this._yt = null;
    }

    shouldComponentUpdate(nextProps, nextState) {
        let { current, player } = this.props;

        // If the song has changed
        let noSongsYet = !nextProps.current.song && !current.song;

        let songChanged =
            (nextProps.current.song && !current.song) ||
            (!nextProps.current.song && current.song) ||
            (!noSongsYet && nextProps.current.song.id != current.song.id);

        // All the conditions that would let a full re-render
        // happen for the player.
        return songChanged || false /* TODO More Conditions */;
    }

    componentWillReceiveProps(nextProps) {
        this.setPlayerPlaying(nextProps.player.isPlaying);
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

    updatePosition = (position, total) => {
        this.props.dispatch(PlayerActionCreators.updatePosition(position, total));
    };

    updateIsPlaying = (isPlaying) => {
        if (this.props.player.isPlaying != isPlaying) {
            this.props.dispatch(PlayerActionCreators.updateIsPlaying(isPlaying));
        }
    };

    render() {

        // Clear the reference, it'll be updated later.
        this._yt = null;

        let { current } = this.props;

        let ytProps = {
            video: current.song ? current.song.mediaCode : '',
            start: current.startPosition,
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

export default connect(state => ({
    player: state.player,
    current: state.queue.current
}))(Player);