import React from "react"

import Component from "../../Component"

export default class Connecting extends Component {
    render() {
        return (

            <div className="c-connecting">
                <div className="e-title">
                    The connection to the server has been lost...
                </div>

                <div className="e-animation">
                    <img src="./src/images/ripple.svg" alt="Ripple" />
                    <span>Connecting...</span>
                </div>
            </div>

        );
    }
}