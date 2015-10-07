import React            from "react"

import Component        from "../../Component"
import ProfileIcon      from "./ProfileIcon"

export default class ProfileMenu extends Component {

    render() {

        return (
            <div className="c-profile-menu">
                <div className="e-name">
                    Test User
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