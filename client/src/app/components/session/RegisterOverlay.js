import React                from "react"

import * as Constants       from "../../Constants"

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

export default class RegisterOverlay extends React.Component {
    constructor() {
        super(...arguments);

        /*
        this.state = {
            isConfirming: false,
            isRegistering: false,
            formData: Object.assign({}, formDataTemplate),
            message: null
        };

        this.addActions({
            'session': Constants.Actions.SESSION
        });

        this.addStores({
            'session': Constants.Stores.SESSION
        });

        this.selfBindMethods([
            this.onValueChanged,
            this.onSubmit,
            this.onSigninInstead
        ]);
        */
    }

    
    onNewState(state) {
        if (state.session) {
            var registrationState = state.session.register.state;
            var message = state.session.register.errorMessage;

            this.setState({
                isConfirming: registrationState == Constants.RegisterStates.CONFIRMING,
                isRegistering: registrationState == Constants.RegisterStates.REGISTERING,
                message: message
            });
        }
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
            data.username.value &&
            data.displayname.value &&
            data.email.value &&
            data.language.value &&
            data.password.value &&
            data.passwordAgain.value;

        var isAllValid =
            data.username.isValid &&
            data.displayname.isValid &&
            data.email.isValid &&
            data.language.isValid &&
            data.password.isValid &&
            data.passwordAgain.isValid;

        data.isReady = hasAllFields && isAllValid;
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
        this.actions.session.registerCancel();
        this.actions.session.loginBegin();
    }

    onSubmit() {

        var data = this.state.formData;

        if (!data.isReady) {
            return;
        }

        this.actions.session.register(
            data.username.value,
            data.displayname.value,
            data.email.value,
            data.language.value,
            data.password.value
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
                        onClick={this.onSigninInstead} />
                </div>
            </div>
        );

        var overlayAttributes = {
            overlayText: 'Registering',
            overlayShown: this.state.isRegistering,
            infoElement: info
        };

        return (
            <SessionOverlay {...overlayAttributes}>
                {this.renderInner()}
            </SessionOverlay>
        )
    }

    renderInner() {
        if (this.state.isConfirming) {
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
                    message={this.state.message}
                    onValueChanged={this.onValueChanged}
                    onSubmit={this.onSubmit} />
            )
        }
    }
}