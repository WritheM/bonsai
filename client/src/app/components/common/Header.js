import React        from "react";
import { connect }  from "react-redux";

import * as UIActions       from "../../actions/ui";

import HeaderBanner         from "./HeaderBanner"
import Search               from "./Search"
import Notifications        from "./Notifications"
import ProfileMenu          from "./ProfileMenu"

class Header extends React.Component {

    onMenuToggle = () => {
        this.props.dispatch(UIActions.toggleMenu());
    };

    get currentUser() {
        let { user } = this.props;
        return user.collection.find(e => e.id == user.current.id);
    }

    render() {
        return (

            <div id="bonsaiHeader" className="c-shell-header">
                <div className="e-banner">
                    <HeaderBanner isExpanded={this.props.ui.menu.isOpen} />
                </div>
                <div className="e-search">
                    <Search onMenuToggle={this.onMenuToggle} />
                </div>
                <div className="e-notifications">
                    <Notifications />
                </div>
                <div className="e-user">
                    <ProfileMenu user={this.currentUser} />
                </div>
            </div>

        );
    }
}

export default connect((state) => ({
    ui: state.ui,
    user: state.user
}))(Header);