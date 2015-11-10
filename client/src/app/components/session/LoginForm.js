import React, { PropTypes } from "react"
import classnames           from "classnames"

import { DumbComponent }    from "../../Components"

import SessionFormButton    from "./SessionFormButton"
//import FormInput from "./FormInput"

let formInputShape = PropTypes.shape({
    'value': PropTypes.string,
    'isValid': PropTypes.bool.isRequired,
    'problem': PropTypes.string
});

export default class LoginForm extends DumbComponent {

    static propTypes = {
        'data': PropTypes.shape({
            'username': formInputShape.isRequired,
            'password': formInputShape.isRequired,
            'isReady': PropTypes.bool.isRequired
        }).isRequired,

        'message': PropTypes.string,

        'onValueChanged': PropTypes.func.isRequired,
        'onSubmit': PropTypes.func.isRequired
    };

    constructor() {
        super(...arguments);

        this.selfBindMethods([
            this.getInputAttributes,
            this.updateTextValue
        ]);
    }

    getInputAttributes(key, rootClass) {

        var classDef = {
            'm-invalid': !this.props.data[key].isValid
        };

        classDef[rootClass] = true;

        var classes = classnames(classDef);

        return {
            className: classes,
            title: this.props.data[key].problem
        };
    }

    updateTextValue(key, event) {
        this.props.onValueChanged(key, event.target.value);
    }

    render() {

        var message = null;
        if (this.props.message) {
            message = (
                <div className="e-message">
                    {this.props.message}
                </div>
            )
        }

        return (
            <div className="c-register-form">
                {message}
                {this.renderInput('username', 'Username or E-Mail', 'e-username')}
                {this.renderInput('password', 'Password', 'e-password')}
                <SessionFormButton
                    type="submit"
                    text="Sign In"
                    isDisabled={!this.props.data.isReady}
                    onClick={this.props.onSubmit} />
            </div>
        );
    }

    renderInput(key, placeholder, rootClass) {
        return (
            <div {...this.getInputAttributes(key, rootClass)}>
                <input
                    type="text"
                    placeholder={placeholder}
                    value={this.props.data[key].value}
                    onChange={(event) => this.updateTextValue(key, event)} />
            </div>
        )
    }

    renderMessageBlock() {
        if (this.props.message) {
            return (
                <div className="e-message">
                    <p>
                        {this.props.message}
                    </p>
                </div>
            );
        } else {
            return null;
        }
    }
}