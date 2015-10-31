import React from "react"

import { DumbComponent } from "../../Components"

export default class MenuItem extends DumbComponent {
    render() {

        return (

            <div className="c-menu-item">
                {this.props.title}
            </div>

        );
    }
}