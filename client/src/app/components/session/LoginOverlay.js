import React                from "react"
import { connect }          from "react-redux"

import {
    LoginStates
}                           from "../../Constants"

import SessionOverlay       from "./SessionOverlay"
import SessionFormButton    from "./SessionFormButton"
import LoginForm            from "./LoginForm"

import * as SessionActions  from "../../actions/session";

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

class LoginOverlay extends React.Component {

    static contextTypes = {
        api: React.PropTypes.object.isRequired
    };

    constructor() {
        super(...arguments);

        this.state = {
            formData: {...formDataTemplate}
        };
    }

    get isAuthenticating() {
        return this.props.login.state == LoginStates.AUTHENTICATING;
    }

    validateNewData(data) {

        var hasAllFields =
            !!data.username.value &&
            !!data.password.value;

        var isAllValid =
            !!data.username.isValid &&
            !!data.password.isValid;

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
        this.props.dispatch(SessionActions.loginCancel());
        this.props.dispatch(SessionActions.registerCancel());
    }

    emitClose() {
        this.props.dispatch(SessionActions.loginCancel());
    }

    emitError(message) {
        this.props.dispatch(SessionActions.loginUpdateView(
            LoginStates.OPEN,
            message
        ));
    }

    onSubmit() {

        var data = this.state.formData;

        if (!data.isReady) {
            return;
        }

        this.props.dispatch(SessionActions.loginWaiting());
        this.props.dispatch(SessionActions.apiLogin(
            data.username.value,
            data.password.value,
            operation => operation
                .then(
                    response => {
                        this.emitClose();
                    },
                    response => {
                        this.emitError(response.message);
                    }
                )
        ));
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
                        onClick={this.onSignupInstead.bind(this)} />
                </div>
            </div>
        );

        var overlayAttributes = {
            overlayText: 'Logging In...',
            overlayShown: this.isAuthenticating,
            infoElement: info
        };

        return (
            <SessionOverlay {...overlayAttributes}>
                <LoginForm
                    data={this.state.formData}
                    message={this.props.login.errorMessage}
                    onValueChanged={this.onValueChanged.bind(this)}
                    onSubmit={this.onSubmit.bind(this)} />
            </SessionOverlay>
        )
    }
}

export default connect(state => ({
    login: state.session.login
}))(LoginOverlay);