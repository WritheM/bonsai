import React            from "react"

import Component        from "../../Component"
import ProfileIcon      from "./ProfileIcon"

export default class RoomSelector extends Component {

    constructor() {
        super(...arguments);

        this.state = {
            isExpanded: false
        };
    }

    render() {

        var classes = React.addons.classSet({
            'c-room-selector': true,
            'm-expanded': this.state.isExpanded
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