import React                from "react"

import { DumbComponent }    from "../../Components"
import SocialList           from "./SocialList"

let wheelScrollCoefficient = 30;

export default class SocialBar extends DumbComponent {

    constructor() {
        super(...arguments);

        this.refMembers = null;
        this.refMembersPage = null;

        this.state = {
            scrollPosition: 0
        };

        this.selfBindMethods([
            this.onMembersScroll
        ]);
    }

    componentDidMount() {

        this.refMembers.getDOMNode().addEventListener(
            'wheel', this.onMembersScroll
        );

    }

    componentWillUnmount() {

        if (this.refMembers) {
            this.refMembers.getDOMNode().removeEventListener(
                'wheel', this.onMembersScroll
            );

            this.refMembers = null;
        }

        if(this.refMembersPage) {
            this.refMembersPage = null;
        }

    }

    shouldComponentUpdate(newProps, newState) {
        if (this.state.scrollPosition != newState.scrollPosition &&
            this.refMembersPage) {

            this.refMembersPage.getDOMNode().style.marginTop = newState.scrollPosition + 'px';
            return false;
        }

        return true;
    }

    onMembersScroll(event) {

        var units = event.wheelDelta;
        if (units > 0) {
            // Up
            this.scroll(wheelScrollCoefficient);
        } else {
            // Down
            this.scroll(-1 * wheelScrollCoefficient);
        }

        event.preventDefault();
        event.stopPropagation();

    }

    scroll(offset) {

        var containerDOM = this.refMembers.getDOMNode();
        var pageDOM = this.refMembersPage.getDOMNode();

        var maxScroll = -1 * (pageDOM.clientHeight - containerDOM.clientHeight);
        var position = this.state.scrollPosition + offset;

        if (position > 0) {
            position = 0;
        }

        if (position < maxScroll) {
            position = maxScroll;
        }

        this.setState({
            scrollPosition: position
        });

    }

    render() {

        var rooms = [
            { id: 1, name: 'Test Room' },
            { id: 2, name: 'Test Room 2' },
            { id: 3, name: 'Test Room 3' },
            { id: 1, name: 'Test Room' },
            { id: 2, name: 'Test Room 2' },
            { id: 3, name: 'Test Room 3' },
            { id: 1, name: 'Test Room' },
            { id: 2, name: 'Test Room 2' },
            { id: 3, name: 'Test Room 3' }
        ];

        var users = [
            { id: 1, username: 'Person1', displayname: 'Person One' },
            { id: 2, username: 'Person2', displayname: 'Person Two' },
            { id: 3, username: 'Person3', displayname: 'Person Three' },
            { id: 1, username: 'Person1', displayname: 'Person One' },
            { id: 2, username: 'Person2', displayname: 'Person Two' },
            { id: 3, username: 'Person3', displayname: 'Person Three' },
            { id: 1, username: 'Person1', displayname: 'Person One' },
            { id: 2, username: 'Person2', displayname: 'Person Two' },
            { id: 3, username: 'Person3', displayname: 'Person Three' },
            { id: 1, username: 'Person1', displayname: 'Person One' },
            { id: 2, username: 'Person2', displayname: 'Person Two' },
            { id: 3, username: 'Person3', displayname: 'Person Three' }
        ];

        var currentRoom = { id: 1, name: 'Test Room' };

        var svgArrowStyles = {
            'fill': '#ffffff',
            'fill-rule': 'evenodd',
            'stroke': 'none'
        };

        return (
            <div className="c-social-bar">
                <div className="e-scroll-up" onClick={(e) => this.scroll(wheelScrollCoefficient)}>
                    <svg viewBox="0 0 1 1" version="1.1">
                        <g>
                            <path style={svgArrowStyles} d="M 0.5,0 0,1 1,1 Z" />
                        </g>
                    </svg>
                </div>
                <div className="e-members" ref={(c) => this.refMembers = c}>
                    <div className="e-members-page" ref={(c) => this.refMembersPage = c}>
                        <SocialList
                            focus={currentRoom}
                            rooms={rooms}
                            users={users} />
                    </div>
                </div>
                <div className="e-buttons">
                    <span></span>
                </div>
                <div className="e-scroll-down" onClick={(e) => this.scroll(-1*wheelScrollCoefficient)}>
                    <svg viewBox="0 0 1 1" version="1.1">
                        <g>
                            <path style={svgArrowStyles} d="M 0.5,1 0,0 1,0 Z" />
                        </g>
                    </svg>
                </div>
            </div>
        )
    }

}