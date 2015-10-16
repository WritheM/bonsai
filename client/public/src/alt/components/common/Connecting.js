import React from "react"

import { DumbComponent } from "../../Components"

export default class Connecting extends DumbComponent {
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