import React from "react"

import * as Constants from "../../Constants"
import { SmartComponent } from "../../Components"

export default class LoginForm extends SmartComponent {

    constructor() {
        super(...arguments);

        this.state = {
            username: '',
            password: '',
            canContinue: false,
            message: null,
            isAuthenticating: false
        };

        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.doLogin        = this.doLogin.bind(this);
    }

    getRequiredActions() {
        return {
            'session': Constants.Actions.SESSION
        };
    }

    getRequiredStores() {
        return {
            'session': Constants.Stores.SESSION
        }
    }

    onStoreUpdated(storeKey, state) {

        console.log('IsAuth', state.login.state);

        if (storeKey !== Constants.Stores.SESSION) {
            return;
        }

        var isAuthenticating = state.login.state === Constants.LoginStates.AUTHENTICATING;

        this.setState({
            message: state.login.errorMessage,
            isAuthenticating: isAuthenticating
        });

    }

    render() {

        var errorBlock = this.state.message && this.state.message !== ''
            ? (
                <div className="e-message">
                    <p>
                        {this.state.message}
                    </p>
                </div>
            )
            : null;



        return (

            <div className="c-login-form">
                {this.renderOverlay()}
                <div className="e-inner">
                    <div className="e-header">
                        <h1>Bonsai</h1>
                    </div>
                    {errorBlock}
                    <div className="e-form">
                        {this.renderUsername()}
                        {this.renderPassword()}
                        {this.renderButton()}
                    </div>
                    <div className="e-info">
                        <p>
                            <a href="#">
                                Forgot Password?
                            </a>
                        </p>
                        <p>
                            Don't have an account?<br/>
                            <a href="#">
                                Create an account!
                            </a>
                        </p>
                    </div>
                </div>
                <div className="e-copy">
                    &copy; 2015 BonsaiFM<br/>
                    Built with love from the contributions to our open-source community
                </div>
            </div>

        );
    }

    renderOverlay() {

        if (!this.state.isAuthenticating) {
            return null;
        }

        return (
            <div className="e-overlay">
                <div className="e-spinner">
                    {/* TODO: Incorrect Location */}
                    <img src="/public/src/images/ripple.svg" alt="Ripple" />
                    <span>Signing In</span>
                </div>

            </div>
        )

    }

    renderUsername() {

        return (
            <div className="e-username">
                <input type="text"
                       placeholder="Username"
                       value={this.state.username}
                       onChange={this.updateUsername} />
            </div>
        );

    }

    renderPassword() {

        return (
            <div className="e-password">
                <input type="password"
                       placeholder="Password"
                       value={this.state.password}
                       onChange={this.updatePassword} />
            </div>
        );

    }

    renderButton() {

        var classes = React.addons.classSet({
            'e-button': true,
            'm-disabled': !this.state.canContinue
        });

        return (
            <div className={classes}>
                <div onClick={this.doLogin}>
                    Sign In
                </div>
            </div>
        );
    }


    getCanContinue(username, password) {
        return username && password;
    }

    updateUsername(event) {

        this.setState({
            username: event.target.value,
            canContinue: this.getCanContinue(event.target.value, this.state.password)
        });
    }

    updatePassword(event) {

        this.setState({
            password: event.target.value,
            canContinue: this.getCanContinue(this.state.username, event.target.value)
        });
    }

    doLogin(event) {

        if (!this.state.canContinue) {
            return;
        }

        this.actions.session.login(
            this.state.username,
            this.state.password
        );

    }
}