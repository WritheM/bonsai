import React            from "react"

import { DumbComponent }       from "../../Components"

export default class PlayerControls extends DumbComponent {

    render() {

        return (
            <div className="c-player-controls">
                <div className="e-prev">
                    <div className="temp-button">&nbsp;</div>
                </div>

                <div className="e-play-pause">
                    <div className="temp-button">&nbsp;</div>
                </div>

                <div className="e-next">
                    <div className="temp-button">&nbsp;</div>
                </div>

                <div className="e-info">
                    <div className="temp-button">&nbsp;</div>
                </div>

                <div className="e-video">
                    <div className="temp-button">&nbsp;</div>
                </div>
            </div>
        );

    }
}