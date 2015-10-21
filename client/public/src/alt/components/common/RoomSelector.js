import React                from "react"
import classnames           from "classnames"

import * as Constants       from "../../Constants"
import { DumbComponent }   from "../../Components"
import ProfileIcon          from "./ProfileIcon"

export default class RoomSelector extends DumbComponent {

    render() {

        var classes = classnames({
            'c-room-selector': true,
            'm-expanded': this.props.isExpanded
        });

        return (
            <div className={classes}>
                <div className="e-room">
                    <ProfileIcon room={true} />
                </div>
                <div className="e-title">
                    WritheM Radio
                </div>
            </div>
        );

    }
}