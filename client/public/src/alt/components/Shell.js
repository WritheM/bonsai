import React            from "react"

import * as Constants   from "../Constants"
import Component        from "../Component"

import Header           from "./common/Header"
import Menu             from "./common/Menu"
import Footer           from "./common/Footer"

export default class Shell extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            isReady: false
        }
    }

    getRequiredStores() {
        return {
            'system': Constants.Stores.SYSTEM
        };
    }

    onStoreUpdated(storeKey, state) {
        // TEMP - Demonstration, this will die

        if (storeKey === Constants.Stores.SYSTEM) {
            this.setState({
                isReady: state.isReady
            });
        }
    }

    render() {

        var message = this.state.isReady
            ? "The Initialization Event has fired and the application has been notified."
            : "The Application has rendered, but the initialize event has not fired yet. This should happen within 5 seconds.";

        return (

            <div id="bonsai" className="c-shell">
                <div className="e-header">
                    <Header />
                </div>
                <div className="e-menu">
                    <Menu />
                </div>
                <div className="e-content">
                    <div style={{padding: '10px'}}>
                        {message}
                    </div>
                </div>
                <div className="e-footer">
                    <Footer />
                </div>
            </div>

        );
    }

}