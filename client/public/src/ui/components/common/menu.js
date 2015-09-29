import React from "react"

import MenuItem from "./menuItem"

var Menu = React.createClass({
    render: function() {

        var items = [
            <MenuItem title="What's new" />,
            <MenuItem title="Rooms" />,
            <MenuItem title="Events" />,
            <MenuItem title="Playlists" />,
            <MenuItem title="Chat" />
        ].map(function(item) {
           return (
                <div className="e-item">
                    {item}
                </div>
           );
        });


        return (

            <div id="menu" className="c-menu">
                {items}
            </div>

        );
    }
});

export default Menu;
