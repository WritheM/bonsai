import React            from "react"

import Component        from "../../Component"

export default class PlayerControls extends Component {

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