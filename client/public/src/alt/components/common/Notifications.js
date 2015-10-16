import React                from "react"

import { DumbComponent }    from "../../Components"

export default class Notifications extends DumbComponent {

    constructor() {
        super(...arguments);

        this.state = {
            isExpanded: false
        };

        this.onToggle = this.onToggle.bind(this);
    }

    onToggle() {
        // TODO
    }

    render() {

        return (
            <div className="c-notifications">
                <div className="e-button">
                    <span>{/* temp */}</span>
                </div>
            </div>
        );

    }
}