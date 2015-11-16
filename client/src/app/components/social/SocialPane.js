import React        from "react"
import classnames   from "classnames"

import * as Constants       from "../../Constants"
import { SmartComponent }   from "../../Components"

import SocialBar            from "./SocialBar"

export default class SocialPane extends SmartComponent {

    render() {

        let rootClasses = classnames({
            'c-social-pane': true,
            'm-collapsed': false,
            'm-focus-collapsed': true
        });

        return (
            <div className={rootClasses}>
                <div className="e-social-focus">
                    Social Focus
                </div>
                <div className="e-social-bar">
                    <SocialBar />
                </div>
            </div>
        )
    }

}