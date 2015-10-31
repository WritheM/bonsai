import React, { PropTypes, Children }   from "react";
import { DumbComponent }                from "../../Components"

import WordMark                         from "../common/WordMark"

export default class SessionOverlay extends DumbComponent {

    static propTypes = {
        overlayShown: PropTypes.bool,
        overlayText: PropTypes.string,
        infoElement: PropTypes.node
    };

    constructor(props, context) {
        props = Object.assign({}, {
            overlayShown: false,
            overlayText: ''
        }, props);

        super(props, context);
    }

    render() {
        return (
            <div className="c-session-overlay">
                {this.renderOverlay()}
                <div className="e-inner">
                    <div className="e-header">
                        <WordMark />
                    </div>
                    <div className="e-inner">
                        {this.props.children}
                    </div>
                    {this.renderInfoElement()}
                </div>
                <div className="e-copy">
                    &copy; 2015 <WordMark /><br/>
                    Built with love from the contributions to our open-source community
                </div>
            </div>
        )
    }

    renderInfoElement() {

        if (!this.props.infoElement) {
            return null;
        }

        return (
            <div className="e-info">
                {this.props.infoElement}
            </div>
        );
    }

    renderOverlay() {

        if (!this.props.overlayShown) {
            return null;
        }

        return (
            <div className="e-overlay">
                <div className="e-spinner">
                    {/* TODO: Incorrect Location */}
                    <img src="/public/src/images/ripple.svg" alt="Ripple" />
                    <span>{this.props.overlayText}</span>
                </div>

            </div>
        )

    }

}