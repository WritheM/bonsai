import React                from "react"

import { DumbComponent }    from "../../Components"
import ProfileIcon          from "../common/ProfileIcon"

export default class SocialList extends DumbComponent {

    render() {

        return (
            <div className="c-social-list">
                {this.renderItems()}
            </div>
        )

    }

    renderItems() {

        var items = [];

        if (this.props.focus) {
            items.push(
                this.renderRoom(this.props.focus)
            );
        }

        if (this.props.rooms) {

            if (items.length > 0) {
                items.push(this.renderSplitter());
            }

            var rooms = this.props.rooms.map((item) => this.renderRoom(item));
            items = items.concat(rooms);
        }

        if (this.props.users) {
            if (items.length > 0) {
                items.push(this.renderSplitter());
            }

            var users = this.props.users.map((item) => this.renderUser(item));
            items = items.concat(users);
        }

        return items;
    }

    renderRoom(item) {
        return (
            <div className="e-item m-room">
                <ProfileIcon room={item} />
            </div>
        );
    }

    renderUser(item) {
        return (
            <div className="e-item m-user">
                <ProfileIcon user={item} />
            </div>
        );
    }

    renderSplitter() {
        return (
            <div className="e-splitter">
                <span></span>
            </div>
        )
    }

}
