import React                from "react"

import { DumbComponent }    from "../../Components"
import PlayerTimeIndex      from "./PlayerTimeIndex"

export default class PlayerProgress extends DumbComponent {

    constructor() {
        super(...arguments);

        this.state = {
            songName: 'Never gonna give you up',
            artistName: 'Rick Astley',
            currentSecond: 50,
            totalSeconds: 189
        }
    }

    render() {

        var progress = (this.state.currentSecond / this.state.totalSeconds) * 100;
        var progressStyles = {
            width: progress + '%'
        };

        return (
            <div className="c-player-progress">
                <div className="e-progress">
                    <div className="e-bar">
                        <div className="e-bar-fill" style={progressStyles}>
                            &nbsp;
                        </div>
                    </div>
                    <div className="e-text">
                        <div className="e-text-container">
                            <span className="e-song-name">
                                {this.state.songName}
                            </span>
                            <span className="e-artist-name">
                                {this.state.artistName}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="e-time-index">
                    <PlayerTimeIndex current={this.state.currentSecond} total={this.state.totalSeconds} />
                </div>
            </div>
        );

    }
}