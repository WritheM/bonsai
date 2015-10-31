import React                from "react"
import classnames           from "classnames"

import { DumbComponent }    from "../../Components"

export default class ProfileIcon extends DumbComponent {

    render() {

        var classes = classnames({
            'c-profile-icon': true,
            'm-user': !!this.props.user,
            'm-room': !!this.props.room
        });

        return (
            <div className={classes}>
                <div className="e-overlay">
                    {this.renderStatus()}
                    {this.renderNotifications()}
                </div>
                <div className="e-icon">
                    &nbsp;
                </div>
            </div>
        );

    }

    renderStatus() {

        // TODO: Connect this to props
        var classes = classnames({
            'e-status': true,
            'm-synced': false,
            'm-online': true,
            'm-dnd': false
        });

        return (
            <div className={classes}>
                &nbsp;
            </div>
        )
    }

    renderNotifications() {

        var notificationCount = this.props.notifications;

        if (notificationCount && notificationCount > 0) {
            return (
                <div className="e-notifications">
                    {notificationCount}
                </div>
            )
        } else {
            return null;
        }

    }
}
