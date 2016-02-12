import React                from "react"

import * as Constants       from "../../Constants"

import SessionOverlay       from "./SessionOverlay"
import SessionFormButton    from "./SessionFormButton"
import LoginForm            from "./LoginForm"

let formFieldTemplate = {
    value: '',
    isValid: true,
    problem: ''
};

let formDataTemplate = {
    username: Object.assign({}, formFieldTemplate),
    password: Object.assign({}, formFieldTemplate),
    isReady: false
};

export default class LoginOverlay extends React.Component {
    constructor() {
        super(...arguments);

        this.state = {
            isAuthenticating: false,
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
            this.onSignupInstead
        ]);
    }

    onNewState(state) {
        if (state.session) {

            var isAuthenticating = state.session.login.state === Constants.LoginStates.AUTHENTICATING;

            this.setState({
                isAuthenticating: isAuthenticating,

            });
        }
    }

    validateNewData(data) {

        var hasAllFields =
            data.username.value &&
            data.password.value;

        var isAllValid =
            data.username.isValid &&
            data.password.isValid;

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

    onSignupInstead() {
        this.actions.session.loginCancel();
        this.actions.session.registerBegin();
    }

    onSubmit() {

        var data = this.state.formData;

        if (!data.isReady) {
            return;
        }

        this.actions.session.login(
            data.username.value,
            data.password.value
        );

    }

    render() {

        var info = (
            <div className="c-login-info">
                <div className="e-forgot">
                    <a href="#">
                        Forgot Password?
                    </a>
                </div>
                <div className="e-question">
                    Don't have an account?
                </div>
                <div className="e-button">
                    <SessionFormButton
                        type="alternate"
                        text="Create an account"
                        onClick={this.onSignupInstead} />
                </div>
            </div>
        );

        var overlayAttributes = {
            overlayText: 'Logging In...',
            overlayShown: this.state.isAuthenticating,
            infoElement: info
        };

        return (
            <SessionOverlay {...overlayAttributes}>
                <LoginForm
                    data={this.state.formData}
                    onValueChanged={this.onValueChanged}
                    onSubmit={this.onSubmit} />
            </SessionOverlay>
        )
    }
}