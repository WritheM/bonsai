import React from "react"

import { SmartComponent } from "../../Components"

/**
 * Renders an overlay window when a condition is met
 *
 * Example:
 *
 * var isShown = (key, state) => state.x == 'yes';
 * var requiredStores = {'store': Constants.Stores.SYSTEM}
 *
 * <OverlayWindow isShown={isShown} requiredStores={requiredStores}>
 *     <ControlToRender />
 * </OverlayWindow>
 */
export default class OverlayWindow extends SmartComponent {

    static propTypes = {
        isShown: React.PropTypes.func.isRequired,
        requiredStores: React.PropTypes.object.isRequired,
        preventExit: React.PropTypes.bool,
        exit: React.PropTypes.func
    };

    constructor(props, context) {
        super(props, context);

        this.addStores(props.requiredStores);

        this.state = {
            show: false
        }
    }


    onNewState(state) {
        var newShown = this.props.isShown(state);
        if (newShown !== null) {
            this.setState({
                show: newShown === true // Normalize
            })
        }
    }

    render() {

        var preventBubble = (ev) => ev.stopPropagation();
        var exitOverlay = (ev) => {

            if (this.props.preventExit) {
                return;
            }

            if (this.props.exit) {
                this.props.exit();
            } else {
                this.setState({
                    show: false
                });
            }
        };

        if (this.state.show) {
            return (
                <div className="c-overlay-window" onClick={exitOverlay}>
                    <div className="e-content" onClick={preventBubble}>
                        {this.props.children}
                    </div>
                </div>
            )
        } else {
            return null;
        }

    }
}