import React from "react"

import Component from "../../Component"

export default class MenuItem extends Component {
    render() {

        return (

            <div className="c-menu-item">
                {this.props.title}
            </div>

        );
    }
}