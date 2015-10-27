import React                from "react"

import { DumbComponent }    from "../../Components"

export default class PlayerTimeIndex extends DumbComponent {

    formatSeconds(seconds) {
        if (seconds > 3600) {
            return this.formatHourSeconds(seconds);
        } else {
            return this.formatMinuteSeconds(seconds);
        }
    }

    formatHourSeconds(seconds) {
        var minutes = Math.floor(seconds / 60);
        var remSeconds = seconds % 60;
        var hours = Math.floor(minutes / 60);
        var remMinutes = minutes % 60;

        return hours + ':' + this.withLeadingZero(remMinutes) + ':' + this.withLeadingZero(remSeconds);
    }

    formatMinuteSeconds(seconds) {
        var minutes = Math.floor(seconds / 60);
        var remSeconds = seconds % 60;

        return minutes + ':' + this.withLeadingZero(remSeconds);
    }

    withLeadingZero(num) {
        if (num < 10) {
            return '0' + num;
        }

        return num;
    }


    render() {

        var current = this.formatSeconds(Math.floor(this.props.current));
        var total = this.formatSeconds(Math.floor(this.props.total));

        return (
            <div className="c-player-time-index">
                <div className="e-text">
                    {current} / {total}
                </div>
            </div>
        );

    }
}