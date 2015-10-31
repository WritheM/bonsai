import React                    from "react"
import classnames               from "classnames"

import { DumbComponent }       from "../../Components"

export default class PlayerControls extends DumbComponent {

    render() {

        var playPauseClasses = classnames({
            'e-play-pause': true,
            'm-playing': this.props.isPlaying
        });

        var queueClasses = classnames({
            'e-queue': true,
            'm-open': this.props.isQueueOpen
        });

        var theatreClasses = classnames({
            'e-theatre': true,
            'm-open': this.props.isTheatreOpen
        });

        return (
            <div className="c-player-controls">
                <div className="e-prev">
                    <div className="temp-button" onClick={this.props.callbacks.back}>&nbsp;</div>
                </div>

                <div className={playPauseClasses}>
                    <div className="temp-button" onClick={this.props.callbacks.playPause}>&nbsp;</div>
                </div>

                <div className="e-next">
                    <div className="temp-button" onClick={this.props.callbacks.next}>&nbsp;</div>
                </div>

                <div className={queueClasses}>
                    <div className="temp-button" onClick={this.props.callbacks.queue}>&nbsp;</div>
                </div>

                <div className={theatreClasses}>
                    <div className="temp-button" onClick={this.props.callbacks.theatre}>&nbsp;</div>
                </div>
            </div>
        );

    }
}