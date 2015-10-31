import React                from "react"
import classnames           from "classnames"

import { DumbComponent }    from "../../Components"

export default class PlayerVotes extends DumbComponent {

    render() {

        var leafClasses = classnames({
            'e-leaf': true,
            'm-active': this.props.isLeaf
        });

        var sparkClasses = classnames({
            'e-spark': true,
            'm-active': this.props.isSpark
        });

        return (
            <div className="c-player-votes">
                <div className={leafClasses} onClick={this.props.callbacks.leaf}>

                </div>
                <div className={sparkClasses} onClick={this.props.callbacks.spark}>

                </div>
            </div>
        );

    }
}