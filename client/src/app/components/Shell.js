import React                from "react"

import * as Constants       from "../Constants"

import Header               from "./common/Header"
import Content              from "./common/Content"
import Footer               from "./common/Footer"

import OverlayWindow        from "./common/OverlayWindow";


export default class Shell extends React.Component {

    constructor() {
        super(...arguments);
    }

    render() {

        return (

            <div>
                <div id="bonsai" className="c-shell">
                    <div className="e-header">
                        <Header />
                    </div>
                    <div className="e-content">
                        <Content>
                            {this.props.children}
                        </Content>
                    </div>
                    <div className="e-footer">
                        <Footer />
                    </div>
                </div>

                <OverlayWindow />
            </div>

        );
    }

}