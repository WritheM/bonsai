import React from "react"

import { DumbComponent }    from "../../Components"

import HeaderBanner         from "./HeaderBanner"
import Search               from "./Search"
import Notifications        from "./Notifications"
import ProfileMenu          from "./ProfileMenu"

export default class Header extends DumbComponent {
    render() {
        return (

            <div id="bonsaiHeader" className="c-shell-header">
                <div className="e-banner">
                    <HeaderBanner />
                </div>
                <div className="e-search">
                    <Search />
                </div>
                <div className="e-notifications">
                    <Notifications />
                </div>
                <div className="e-user">
                    <ProfileMenu />
                </div>
            </div>

        );
    }
}