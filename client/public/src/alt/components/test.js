import React from "react"

import * as Constants from "../constants"
import BonsaiComponent from "../component"

class Test extends BonsaiComponent {
    constructor(props, context) {
        super(props, context);

        this.state = ((allStates) => {
            return {
                isReady: allStates.system.isReady
            };
        })(this.fetchInitialState());
    }

    getRequiredStores() {
        return {
            'system': Constants.Stores.SYSTEM
        }
    }

    onStoreUpdated(storeKey, state) {
        if (storeKey == Constants.Stores.SYSTEM) {
            this.setState({
                isReady: state.isReady
            });
        }
    }

    render() {
        return (
            <div>Is Ready: {this.state.isReady.toString()}</div>
        );
    }
}

export default Test;