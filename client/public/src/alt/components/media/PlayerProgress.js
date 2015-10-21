import React                from "react"

import { DumbComponent }    from "../../Components"
import PlayerTimeIndex      from "./PlayerTimeIndex"

export default class PlayerProgress extends DumbComponent {

    render() {

        var progress = (this.props.current / this.props.total) * 100;
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
                                {this.props.title}
                            </span>
                            <span className="e-artist-name">
                                {this.props.artist}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="e-time-index">
                    <PlayerTimeIndex current={this.props.current} total={this.props.total} />
                </div>
            </div>
        );

    }
}