import React from "react"

import Component from "../../Component"

export default class Player extends Component {
    render() {
        return (

            <div id="player" className="c-player">

                <div className="e-votes">
                    U/D
                </div>
                <div className="e-volume">
                    VOL
                </div>

                <div className="e-controls">
                    /* Controls */
                </div>

                <div className="e-progress">
                    <div className="e-progress-bar">
                        1:59 / 5:32
                    </div>
                </div>
            </div>

        );
    }
}