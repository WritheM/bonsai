import React from "react"

import Component from "../../Component"
import MenuItem from "./MenuItem"

export default class Menu extends Component {
    render() {

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
}
