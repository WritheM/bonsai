import React from "react";
import { connect } from "react-redux";

import * as queueActions from "../actions/queue";
import * as sessionActions from "../actions/session";

const dummySong = {
    'id': '1337',
    'title': 'Public Domain Music: Aquasky (Electronica)',
    'artist': 'TheEyeThatSees',
    'mediaType': 'youtube',
    'mediaCode': '6JMuxTR1d20'
};

const Dashboard = ({ doRegister, doLogin, doLogout, doPlay }) => (
    <div className="c-dashboard">
        Dashboard v2 -
        <a href="#" onClick={doPlay}>Load Public Domain Song</a> -
        <a href="#" onClick={doRegister}>Register</a> -
        <a href="#" onClick={doLogin}>Login</a> -
        <a href="#" onClick={doLogout}>Logout</a>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    doRegister: () => dispatch(sessionActions.registerBegin()),
    doLogin: () => dispatch(sessionActions.loginBegin()),
    doLogout: () => dispatch(sessionActions.logout()),
    doPlay: () => dispatch(queueActions.playSong(dummySong))
});

export default connect(
    null,
    mapDispatchToProps
)(Dashboard);