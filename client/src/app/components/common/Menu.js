import React from "react"

import { DumbComponent } from "../../Components"
import MenuItem from "./MenuItem"

export default class Menu extends DumbComponent {
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
