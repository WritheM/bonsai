import React from "react"

import { DumbComponent }    from "../../Components"

import PlayerControls       from "../media/PlayerControls"
import PlayerProgress       from "../media/PlayerProgress"
import PlayerActions        from "../media/PlayerActions"
import RoomSelector         from "./RoomSelector"

export default class Header extends DumbComponent {
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