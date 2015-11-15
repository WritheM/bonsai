import React from "react"

import * as Constants       from "../../Constants"
import { SmartComponent }   from "../../Components"

import HeaderBanner         from "./HeaderBanner"
import Search               from "./Search"
import Notifications        from "./Notifications"
import ProfileMenu          from "./ProfileMenu"

export default class Header extends SmartComponent {

    constructor() {
        super(...arguments);

        this.addActions({
            'ui': Constants.Actions.UI
        });

        this.addStores({
            'ui': Constants.Stores.UI,
            'user': Constants.Stores.USER
        });

        this.selfBindMethods([
            this.onMenuToggle
        ]);

        this.state = {
            isBannerExpanded: false,
            currentUser: null
        };
    }

    onNewState(state) {

        let {ui, user} = state;

        if (ui) {
            this.setState({
                isBannerExpanded: ui.menu.isOpen
            });
        }

        if (user) {
            let currentUser = user.users[user.current] || null;

            this.setState({
                currentUser: currentUser
            });
        }

    }

    onMenuToggle() {
        this.actions.ui.toggleMenu();
    }

    render() {
        return (

            <div id="bonsaiHeader" className="c-shell-header">
                <div className="e-banner">
                    <HeaderBanner isExpanded={this.state.isBannerExpanded} />
                </div>
                <div className="e-search">
                    <Search onMenuToggle={this.onMenuToggle} />
                </div>
                <div className="e-notifications">
                    <Notifications />
                </div>
                <div className="e-user">
                    <ProfileMenu user={this.state.currentUser} />
                </div>
            </div>

        );
    }
}