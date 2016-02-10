import React from "react"

import * as Validators  from "./Validators"
import Routes           from "./Routes"

/**
 * Root Component for the site, it's primary job is to inject
 * the flux (Alt) instance into the context so all it's children
 * can access it if needed to fetch stores / actions.
 */
export default class Application extends React.Component {

    static propTypes = {
        flux: Validators.isBonsaiInstance
    };

    static childContextTypes = {
        flux: Validators.isBonsaiInstance
    };

    getChildContext() {
        return {
            flux: this.props.flux
        }
    }

    render() {
        return Routes;
    }

}
