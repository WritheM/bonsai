import React                from "react";
import { connect }          from "react-redux";

import {
    ConnectionStates,
    LoginStates,
    RegisterStates
}                           from "../../Constants";

import Connecting           from "./Connecting";

import LoginOverlay         from "../session/LoginOverlay";
import RegisterOverlay      from "../session/RegisterOverlay";

class OverlayWindow extends React.Component {

    get showConnecting() {
        return this.props.connectionState != ConnectionStates.CONNECTED;
    }

    get showRegister() {
        return this.props.register.state != RegisterStates.NONE;
    }

    get showLogin() {
        return this.props.login.state != LoginStates.NONE;
    }

    renderOverlay() {
        if (this.showConnecting) {
            return (<Connecting />);
        }

        if (this.showRegister) {
            return (<RegisterOverlay />);
        }

        if (this.showLogin) {
            return (<LoginOverlay />);
        }

        return null;
    }

    exit() {
        // TODO:
    }

    render() {

        let exitOverlay = () => this.exit();
        let preventBubble = (ev) => ev.stopPropagation();

        if (this.showConnecting || this.showRegister || this.showLogin) {
            return (
                <div className="c-overlay-window" onClick={exitOverlay}>
                    <div className="e-content" onClick={preventBubble}>
                        {this.renderOverlay()}
                    </div>
                </div>
            );
        }

        return null;
    }
}

export default connect(state => ({
    register: state.session.register,
    login: state.session.login,
    connectionState: state.system.connectionState
}))(OverlayWindow);