import React from "react"

import Component from "../../Component"
import * as Player from "./Player"

export default class Header extends Component {
    render() {
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
}