import React from "react"

var Player = React.createClass({
    render: function() {
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
});

export default Player;