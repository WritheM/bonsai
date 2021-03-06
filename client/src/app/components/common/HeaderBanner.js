import React        from "react"
import classnames   from "classnames"

import * as Constants           from "../../Constants"
import { DumbComponent }        from "../../Components"

import WordMark                 from "./WordMark"

export default class HeaderBanner extends DumbComponent {

    render() {

        var classes = classnames({
            'c-shell-header-banner': true,
            'm-expanded': this.props.isExpanded
        });

        return (

            <div className={classes}>
                <div className="e-icon">
                    <span>{/* Temp */}</span>
                </div>
                <div className="e-title">
                    <WordMark type="accent" />
                </div>
            </div>

        );
    }
}