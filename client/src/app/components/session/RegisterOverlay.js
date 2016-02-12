import React                from "react"
import { connect }          from "react-redux"

import {
    RegisterStates
}                           from "../../Constants"

import * as SessionActions  from "../../actions/session"

import SessionOverlay       from "./SessionOverlay"
import SessionFormButton    from "./SessionFormButton"
import RegisterForm         from "./RegisterForm"

let formFieldTemplate = {
    value: '',
    isValid: true,
    problem: ''
};

let formDataTemplate = {
    username: Object.assign({}, formFieldTemplate),
    displayname: Object.assign({}, formFieldTemplate),
    email: Object.assign({}, formFieldTemplate),
    language: Object.assign({}, formFieldTemplate),
    password: Object.assign({}, formFieldTemplate),
    passwordAgain: Object.assign({}, formFieldTemplate),
    isReady: false
};

class RegisterOverlay extends React.Component {

    static contextTypes = {
        api: React.PropTypes.object.isRequired
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            formData: {...formDataTemplate}
        };
    }

    get isConfirming() {
        return this.props.register.state == RegisterStates.CONFIRMING;
    }

    get isRegistering() {
        return this.props.register.state == RegisterStates.REGISTERING;
    }

    validateNewData(data) {

        // TODO: I don't like this... re-evaluate

        if (data.passwordAgain.value && data.password.value !== data.passwordAgain.value) {
            data.passwordAgain.isValid = false;
            data.passwordAgain.problem = "Password's don't match.";
        } else {
            // TODO: Find a way to not need this?
            data.passwordAgain.isValid = true;
            data.passwordAgain.problem = "";
        }

        var hasAllFields =
            !!data.username.value &&
            !!data.displayname.value &&
            !!data.email.value &&
            !!data.language.value &&
            !!data.password.value &&
            !!data.passwordAgain.value;

        var isAllValid =
            !!data.username.isValid &&
            !!data.displayname.isValid &&
            !!data.email.isValid &&
            !!data.language.isValid &&
            !!data.password.isValid &&
            !!data.passwordAgain.isValid;

        data.isReady = hasAllFields && isAllValid;
    }

    emitError(error) {
        this.props.dispatch(SessionActions.registerUpdateView(
            RegisterStates.OPEN,
            error
        ));
    }

    emitConfirming() {
        if (this.props.register.state != RegisterStates.REGISTERING) {
            return;
        }

        this.props.dispatch(SessionActions.registerUpdateView(
            RegisterStates.CONFIRMING,
            null
        ));
    }

    onValueChanged(key, value) {

        var newData = Object.assign(
            {},
            formDataTemplate,
            this.state.formData
        );

        newData[key].value = value;

        this.validateNewData(newData);

        this.setState({
            formData: newData
        });

    }

    onSigninInstead() {
        this.props.dispatch(SessionActions.registerCancel());
        this.props.dispatch(SessionActions.loginBegin());
    }

    onSubmit() {
        var data = this.state.formData;

        if (!data.isReady) {
            return;
        }

        this.props.dispatch(SessionActions.registerWaiting());

        this.context
            .api
            .session
            .register(
                data.username.value,
                data.displayname.value,
                data.email.value,
                data.language.value,
                data.password.value
            )
            .then(
                response => {
                    this.emitConfirming();
                },
                response => {
                    this.emitError(response.message);
                }
            );
    }

    render() {

        var info = (
            <div className="c-register-info">
                <div className="e-question">
                    Already have an account?
                </div>
                <div className="e-button">
                    <SessionFormButton
                        type="alternate"
                        text="Sign In"
                        onClick={this.onSigninInstead.bind(this)} />
                </div>
            </div>
        );

        var overlayAttributes = {
            overlayText: 'Registering',
            overlayShown: this.isRegistering,
            infoElement: info
        };

        return (
            <SessionOverlay {...overlayAttributes}>
                {this.renderInner()}
            </SessionOverlay>
        )
    }

    renderInner() {
        if (this.isConfirming) {
            return (
                <div>
                    <strong>Thank you for registering!</strong> We've received your registration, please check
                    your e-mail for instructions.
                </div>
            )
        } else {
            return (
                <RegisterForm
                    data={this.state.formData}
                    message={this.props.register.errorMessage}
                    onValueChanged={this.onValueChanged.bind(this)}
                    onSubmit={this.onSubmit.bind(this)} />
            )
        }
    }
}

export default connect(state => ({
    register: state.session.register
}))(RegisterOverlay);