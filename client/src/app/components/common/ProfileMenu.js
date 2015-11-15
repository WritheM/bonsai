import React                from "react"

import { DumbComponent }    from "../../Components"
import ProfileIcon          from "./ProfileIcon"

export default class ProfileMenu extends DumbComponent {

    render() {

        var username = this.props.user ? this.props.user.displayname : 'Nobody';

        return (
            <div className="c-profile-menu">
                <div className="e-name">
                    {username}
                </div>
                <div className="e-button">
                    <span>&nbsp;</span>
                </div>
                <div className="e-avatar">
                    {/* Temp For Now */}
                    <ProfileIcon user={true} notifications={4} />
                </div>
            </div>
        );

    }
}