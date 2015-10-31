import React                from "react"
import classnames           from "classnames"

import { DumbComponent }    from "../../Components"

export default class PlayerVolume extends DumbComponent {

    render() {

        var fillStyles = {
            'width': this.props.level + '%'
        };

        var muteClasses = classnames({
            'e-mute': true,
            'm-active': this.props.level === 0
        });

        return (
            <div className="c-player-volume">
                <div className={muteClasses} onClick={this.props.callbacks.muteToggle}>

                </div>
                <div className="e-slider">
                    <div className="e-slider-fill" style={fillStyles}>

                    </div>
                </div>
            </div>
        );

    }
}