import React from "react"

import Component from "../../Component"

import PlayerControls   from "../media/PlayerControls"
import PlayerProgress   from "../media/PlayerProgress"
import PlayerActions    from "../media/PlayerActions"
import RoomSelector     from "./RoomSelector.js"

export default class Header extends Component {
    render() {
        return (

            <div id="bonsaiFooter" className="c-shell-footer">
                <div className="e-room-select">
                    <RoomSelector />
                </div>
                <div className="e-controls">
                    <PlayerControls />
                </div>
                <div className="e-progress">
                    <PlayerProgress />
                </div>
                <div className="e-actions">
                    <PlayerActions />
                </div>
            </div>

        );
    }
}