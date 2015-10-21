import React                from "react"

import * as Constants       from "../Constants"
import { SmartComponent }   from "../Components"

import Header               from "./common/Header"
import Content              from "./common/Content"
import Footer               from "./common/Footer"

import OverlayWindow        from "./common/OverlayWindow"

import Connecting           from "./common/Connecting"
import RegisterForm         from "./session/RegisterForm"
import LoginForm            from "./session/LoginForm"


export default class Shell extends SmartComponent {

    constructor() {
        super(...arguments);

        this.addActions({
            'session': Constants.Actions.SESSION
        });
    }

    render() {

        var isRegisterShown     = (state) => state.session.register.state !== Constants.RegisterStates.NONE;
        var isLoginShown        = (state) => state.session.login.state !== Constants.LoginStates.NONE;
        var isConnectingShown   = (state) => state.system.connectionState === Constants.ConnectionStates.CONNECTING;

        var cancelRegister      = () => this.actions.session.registerCancel();
        var cancelLogin         = () => this.actions.session.loginCancel();

        var sessionStores       = {'session': Constants.Stores.SESSION};
        var systemStores        = {'system': Constants.Stores.SYSTEM};

        return (

            <div>
                <div id="bonsai" className="c-shell">
                    <div className="e-header">
                        <Header />
                    </div>
                    <div className="e-content">
                        <Content />
                    </div>
                    <div className="e-footer">
                        <Footer />
                    </div>
                </div>

                <OverlayWindow requiredStores={sessionStores} isShown={isRegisterShown} exit={cancelRegister}>
                    <RegisterForm />
                </OverlayWindow>

                <OverlayWindow requiredStores={sessionStores} isShown={isLoginShown} exit={cancelLogin}>
                    <LoginForm />
                </OverlayWindow>

                <OverlayWindow requiredStores={systemStores} isShown={isConnectingShown} preventExit={true}>
                    <Connecting />
                </OverlayWindow>

            </div>

        );
    }

}