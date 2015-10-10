import React            from "react"

import Component        from "../../Component"
import PlayerVotes      from "./PlayerVotes"
import PlayerVolume     from "./PlayerVolume"
import PlayerPlayModes  from "./PlayerPlayModes"

export default class PlayerActions extends Component {

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