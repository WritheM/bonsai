import React            from "react"
import classnames       from "classnames"

import { DumbComponent }       from "../../Components"

export default class PlayerPlayModes extends DumbComponent {

    render() {

        var shuffleClasses = classnames({
            'e-shuffle': true,
            'm-active': this.props.isShuffle
        });

        var repeatClasses = classnames({
            'e-repeat': true,
            'm-active': this.props.isRepeat
        });

        return (
            <div className="c-player-play-modes">
                <div className={shuffleClasses} onClick={this.props.callbacks.shuffle}>

                </div>
                <div className={repeatClasses} onClick={this.props.callbacks.repeat}>

                </div>
            </div>
        );

    }
}