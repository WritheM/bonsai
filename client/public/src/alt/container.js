import React from "react"

export default class BonsaiContainer extends React.Component {

    static childContextTypes = {
        flux: React.PropTypes.any.isRequired
    };

    getChildContext() {
        return {
            flux: this.props.flux
        }
    }

    render() {
        return this.props.children;
    }

}
