import React from "react"

import * as Constants       from "../../Constants"
import { DumbComponent }    from "../../Components"

export default class Search extends DumbComponent {

    render() {

        return (
            <div className="c-search">
                <div className="e-menu-button">
                    <span onClick={this.props.onMenuToggle}>{/* Temp */}</span>
                </div>
                <div className="e-search-input">
                    <input type="search" placeholder="Search songs, albums..." />
                </div>
            </div>
        );
    }

}