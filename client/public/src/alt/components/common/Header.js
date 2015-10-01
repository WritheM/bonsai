import React from "react"

import Component from "../../Component"
import * as HeaderBanner from "./HeaderBanner"

export default class Header extends Component {
    render() {
        return (

            <div id="bonsaiHeader" className="c-shell-header">
                <div className="e-banner">
                    <HeaderBanner />
                </div>
                <div className="e-search">
                    /* Search */
                </div>
                <div className="e-user">
                    /* User Info */
                </div>
            </div>

        );
    }
}