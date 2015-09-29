import React    from "react"

import Header   from "./common/header"
import Menu     from "./common/menu"
import Footer   from "./common/footer"

var Shell = React.createClass({
    render: function() {
        return (

            <div id="bonsai" className="c-shell">
                <div className="e-header">
                    <Header />
                </div>
                <div className="e-menu">
                    <Menu />
                </div>
                <div className="e-content">
                    /* Body */
                </div>
                <div className="e-footer">
                    <Footer />
                </div>
            </div>

        );
    }
});

export default Shell;