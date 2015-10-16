import React                from "react"

import { DumbComponent }    from "../../Components"
import PlayerVotes          from "./PlayerVotes"
import PlayerVolume         from "./PlayerVolume"
import PlayerPlayModes      from "./PlayerPlayModes"

export default class PlayerActions extends DumbComponent {

    render() {

        return (
            <div className="c-player-actions">
                <div className="e-votes">
                    <PlayerVotes />
                </div>
                <div className="e-volume">
                    <PlayerVolume />
                </div>
                <div className="e-playback-modes">
                    <PlayerPlayModes />
                </div>
            </div>
        );

    }
}