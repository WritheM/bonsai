import React from "react"

var MenuItem = React.createClass({
    render: function() {

        return (

            <div className="c-menu-item">
                {this.props.title}
            </div>

        );
    }
});

export default MenuItem;