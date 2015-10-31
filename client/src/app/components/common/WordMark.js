import React, { PropTypes } from "react"
import classnames           from "classnames"
import { DumbComponent }    from "../../Components"

export default class WordMark extends DumbComponent {

    static propTypes = {
        'type': PropTypes.oneOf([
            'dark',
            'light',
            'accent'
        ])
    };

    render() {

        var classes = classnames({
            'c-word-mark': true,
            'm-light': this.props.type === 'light',
            'm-accent': this.props.type === 'accent'
        });

        return (
            <span className={classes}>
                bonsai<em>FM</em>
            </span>
        );
    }
}