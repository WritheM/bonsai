import React from "react"

import Component from "../../Component"

export default class HeaderBanner extends Component {

    constructor() {
        super(...arguments);

        this.state = {
            isExpanded: false
        };

        this.onClicked = this.onClicked.bind(this);
    }

    onClicked() {

        // TODO: Fire global event instead

        this.setState({
            isExpanded: !this.state.isExpanded
        });
    }

    render() {

        var classes = React.addons.classSet({
            'c-shell-header-banner': true,
            'm-expanded': this.state.isExpanded
        });

        return (

            <div className={classes} onClick={this.onClicked}>
                <div className="e-icon">
                    <span>{/* Temp */}</span>
                </div>
                <div className="e-title">
                    Bonsai
                </div>
            </div>

        );
    }
}