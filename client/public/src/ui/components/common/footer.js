import React from "react"

import * as Player from "./player"

var Header = React.createClass({
    render: function() {
        return (

            <div id="bonsaiFooter" className="c-shell-footer">
                <div className="e-room-select">
                    /* Room Select */
                </div>
                <div className="e-player">
                    <Player />
                </div>
                <div className="e-search">
                    /* Member Search */
                </div>
            </div>

        );
    }
});

export default Header;