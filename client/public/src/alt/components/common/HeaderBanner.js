import React from "react"

import * as Constants   from "../../Constants"
import Component        from "../../Component"

export default class HeaderBanner extends Component {

    constructor() {
        super(...arguments);

        this.state = {
            isExpanded: false
        };
    }

    getRequiredStores() {
        return {
            'ui': Constants.Stores.UI
        }
    }

    onStoreUpdated(storeKey, state) {
        if (storeKey === Constants.Stores.UI)
            return this.onUIUpdated(state);
    }

    onUIUpdated(state) {
        this.setState({
            isExpanded: state.menu.isOpen
        });
    }

    render() {

        var classes = React.addons.classSet({
            'c-shell-header-banner': true,
            'm-expanded': this.state.isExpanded
        });

        return (

            <div className={classes}>
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