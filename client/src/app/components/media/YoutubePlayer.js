import React, { PropTypes } from "react"

import { DumbComponent }    from "../../Components"
import * as Utilities       from "../../Utilities"

// Dependency: global.YT;

export default class YoutubePlayer extends DumbComponent {

    /**
     * Required Properties for this component.
     */
    static propTypes = {
        video: PropTypes.string,
        start: PropTypes.number,
        updatePosition: PropTypes.func.isRequired,
        updateIsPlaying: PropTypes.func.isRequired
    };

    constructor() {
        super(...arguments);

        this._container = null;
        this._player = null;
        this._lastVideo = null;

        this.selfBindMethods([
            this.onYTReady
        ]);
    }

    componentWillMount() {

        this._interval = setInterval(() => {
            if (this._player) {
                this.props.updatePosition(this._player.getCurrentTime(), this._player.getDuration());
            }
        }, 100);

    }

    componentWillUnmount() {

        clearInterval(this._interval);

        super.componentWillUnmount();
    }

    shouldComponentUpdate(newProps, newState) {
        return newProps !== this._lastVideo;
    }

    componentWillUpdate(nextProps, nextState) {
        this._lastVideo = this.props.video;
    }

    componentDidUpdate(prevProps, prevState) {
        // None for now
    }

    attachPlayer(container) {

        if (!container) {
            return;
        }

        this._container = container;

        var domNode = container.getDOMNode();
        if (YT.loaded) {
            this.initPlayer(domNode);
        } else {
            YT.ready(() => {
                this.initPlayer();
            });
        }
    }

    onYTReady(event) {
        this.play();
    }

    initPlayer(domNode) {

        if (this.props.video) {
            if (this._player) {
                this._player.loadVideoById(
                    this.props.video,
                    this.props.start
                );

                this._player.seekTo(this.props.start);
            } else {
                this._player = new YT.Player(domNode, {
                    videoId: this.props.video,
                    startSeconds: this.props.start,
                    events: {
                        'onReady': (event) => {
                            event.target.seekTo(this.props.start);
                            event.target.playVideo();
                        },
                        'onStateChange': (event) => {

                            if (event.data === YT.PlayerState.PLAYING) {
                                this.props.updateIsPlaying(true);
                            }

                            if (event.data == YT.PlayerState.PAUSED) {
                                this.props.updateIsPlaying(false);
                            }

                        }
                    }
                });
            }
        } else {
            if (this._player) {
                this._player.destroy();
                this._player = null;
            }
        }

    }

    getEmbedLink(code) {
        if (!code) {
            return 'about:blank'
        } else {
            return 'https://www.youtube.com/embed/' + code;
        }
    }

    play() {
        if (this._player && this._player.playVideo) {
            this._player.playVideo();
        }
    }

    pause() {
        if (this._player && this._player.pauseVideo) {
            this._player.pauseVideo();
        }
    }

    render() {

        return (

            <div className="c-youtube-player">
                <div className="e-player" ref={(e) => this.attachPlayer(e)} data-video={this.props.video} data-start={this.props.start}>

                </div>
            </div>

        );
    }
}



