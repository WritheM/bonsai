import React from "react"

import Component from "../../Component"

export default class Search extends Component {

    constructor() {
        super(...arguments);

        this.onToggleMenu = this.onToggleMenu.bind(this);
    }

    onToggleMenu() {
        // TODO
    }

    render() {

        return (
            <div className="c-search">
                <div className="e-menu-button">
                    <span onClick={this.onToggleMenu}>{/* Temp */}</span>
                </div>
                <div className="e-search-input">
                    <input type="search" placeholder="Search songs, albums..." />
                </div>
            </div>
        );
    }

}