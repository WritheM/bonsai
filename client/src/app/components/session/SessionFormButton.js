import React, { PropTypes } from "react"
import classnames from "classnames"

import { DumbComponent } from "../../Components"

export default class SessionFormButton extends DumbComponent {

    /*
     * Note: This logic is starting to get pretty complex, perhaps we should
     *       move it somewhere common before getting too far.
     */

    static propTypes = {
        'type': PropTypes.oneOf(['submit', 'alternate']),
        'text': PropTypes.string.isRequired,
        'isDisabled': PropTypes.bool,
        'onClick': PropTypes.func.isRequired
    };

    constructor() {
        super(...arguments);

        this.selfBindMethods([
            this.onClick,
            this.onMouseDown,
            this.onMouseUp,
            this.onMouseEnter,
            this.onMouseLeave
        ]);

        /*
         * Local UI State:
         * This violates the concept of a dumb-component only slightly. Local state
         * is "ok" for REALLY container things, making the layer above manage these
         * states would be highly mundane.
         */
        this.state = {
            hover: false,
            pressed: false
        }
    }

    onClick() {
        if (this.props.isDisabled) {
            return;
        }

        this.props.onClick();
    }

    onMouseUp() {
        this.setState({ pressed: false });
    }

    onMouseDown() {
        this.setState({ pressed: true });
    }

    onMouseEnter() {
        this.setState({ hover: true });
    }

    onMouseLeave() {
        this.setState({ hover: false });
    }

    render() {

        // TODO: Icons

        var classes = classnames({
            'c-session-form-button': true,
            'm-disabled': this.props.isDisabled,
            'm-submit': this.props.type === 'submit',
            'm-alternate': this.props.type === 'alternate',
            'm-hovered': this.state.hover,
            'm-pressed': this.state.pressed
        });

        var events = {
            onClick: this.onClick,
            onMouseUp: this.onMouseUp,
            onMouseDown: this.onMouseDown,
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave
        };

        return (
            <div className={classes} {...events}>
                {this.props.text}
            </div>
        );

    }

}