import React from "react"

import * as HeaderBanner from "./headerBanner"

var Header = React.createClass({
    render: function() {
        return (

            <div id="bonsaiHeader" className="c-shell-header">
                <div className="e-banner">
                    <HeaderBanner />
                </div>
                <div className="e-search">
                    /* Search */
                </div>
                <div className="e-user">
                    /* User Info */
                </div>
            </div>

        );
    }
});

export default Header;