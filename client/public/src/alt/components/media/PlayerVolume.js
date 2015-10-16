import React                from "react"

import { DumbComponent }    from "../../Components"

export default class PlayerVolume extends DumbComponent {

    constructor() {
        super(...arguments);

        this.state = {
            volume: 70
        };
    }

    render() {

        var fillStyles = {
            'width': this.state.volume + '%'
        };

        return (
            <div className="c-player-volume">
                <div className="e-mute">

                </div>
                <div className="e-slider">
                    <div className="e-slider-fill" style={fillStyles}>

                    </div>
                </div>
            </div>
        );

    }
}