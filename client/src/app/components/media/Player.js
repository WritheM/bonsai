import React            from "react";
import { connect }      from "react-redux";

import classnames       from "classnames";

import {
    PlayerModes
}                                from "../../Constants";

import * as PlayerActionCreators from "../../actions/player";

import PlayerHandle         from "./PlayerHandle";
import YoutubePlayer        from "./YoutubePlayer";

class Player extends React.Component {

    constructor() {
        super(...arguments);

        this._yt = null;
        this.state = {
            offset: {
                x: 0,
                y: 0
            },
            isMoving: false
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        let { current, player } = this.props;

        let playerModeChanged = nextProps.player.display.mode != player.display.mode;
        let playerAnchorChanged = nextProps.player.display.anchor != player.display.anchor;

        let playerMoved =
            nextProps.player.display.location.x != player.display.location.x ||
            nextProps.player.display.location.y != player.display.location.y ||
            nextState.offset.x != this.state.offset.x ||
            nextState.offset.y != this.state.offset.y;

        // If the song has changed
        let noSongsYet = !nextProps.current.song && !current.song;

        let songChanged =
            current.syncToken !== nextProps.current.syncToken;

        // All the conditions that would let a full re-render
        // happen for the player.
        return songChanged ||
            playerModeChanged ||
            playerAnchorChanged ||
            playerMoved;
    }

    componentWillReceiveProps(nextProps) {
        this.setPlayerPlaying(nextProps.player.playback.isPlaying);
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
        if (this.props.player.playback.isPlaying != isPlaying) {
            this.props.dispatch(PlayerActionCreators.updateIsPlaying(isPlaying));
        }
    };

    render() {
        // Clear the reference, it'll be updated later.
        this._yt = null;

        let { current, player, ui } = this.props;
        let { mode, anchor, location } = player.display;

        let ytProps = {
            video: current.song ? current.song.mediaCode : '',
            start: current.startPosition,
            syncToken: current.syncToken,
            updatePosition: this.updatePosition,
            updateIsPlaying: this.updateIsPlaying
        };

        let playerSizeClass = `m-size-${mode.toLowerCase()}`;
        let playerAnchorClass = `m-anchor-${anchor.toLowerCase()}`;

        let playerClasses = classnames(
            "c-player",
            playerSizeClass,
            playerAnchorClass,
            {
                "m-with-menu":      ui.isMenuVisible,
                "m-with-social":    ui.isSocialPaneVisible
            }
        );

        /*
         * TODO: Figure out a better drag model.
        let playerStyles = mode == PlayerModes.MIN
            ? {
                left: (location.x + this.state.offset.x) + 'px',
                top: (location.y + this.state.offset.y) + 'px'
            }
            : { };
         */

        let playerStyles = {}; // TEMP

        return (

            <div className={playerClasses} style={playerStyles}>
                <div className="e-header">

                </div>
                <div className="e-screen">
                    <YoutubePlayer {...ytProps} ref={(yt) => this._yt = yt} />
                </div>
                <div className="e-footer">

                </div>
                {this.renderHandle(mode == PlayerModes.MIN)}
            </div>

        );
    }

    onMoveBegin(position) {
        this.setState({
            isMoving: true,
            offset: {
                x: 0,
                y: 0
            }
        });
    }

    onMoveEnd(position) {

        var location = this.props.player.display.location;
        var offset = this.state.offset;

        var newX = location.x + offset.x;
        var newY = location.y + offset.y;

        this.props.dispatch(PlayerActionCreators.updateLocation(newX, newY));

        this.setState({
            isMoving: false,
            offset: {
                x: 0,
                y: 0
            }
        });
    }

    onMove(position, delta) {
        this.setState({
            offset: {
                x: this.state.offset.x + delta.x,
                y: this.state.offset.y + delta.y
            }
        });
    }

    renderHandle(isVisible) {
        if (!isVisible) {
            return null;
        }

        let props = {
            /*
            onBegin: this.onMoveBegin.bind(this),
            onEnd: this.onMoveEnd.bind(this),
            onDrag: this.onMove.bind(this)
            */
            onClick: (e) => this.props.dispatch(PlayerActionCreators.nextAnchor())
        };

        return (
            <div className="e-handle">
                <PlayerHandle {...props} />
            </div>
        );
    }
}

export default connect(state => ({
    player: state.player,
    current: state.queue.current,
    ui: {
        isMenuVisible: state.ui.menu.isVisible,
        isSocialPaneVisible: state.ui.socialPane.isVisible
    }
}))(Player);