import React from "react"

import * as Constants   from "../../Constants"
import Component        from "../../Component"

export default class Search extends Component {

    constructor() {
        super(...arguments);

        this.onToggleMenu = this.onToggleMenu.bind(this);
    }

    getRequiredActions() {
        return {
            'ui': Constants.Actions.UI
        }
    }

    onToggleMenu() {
        this.actions.ui.toggleMenu();
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