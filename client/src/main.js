// Libraries
import React        from "react"
import ReactDOM     from "react-dom"

import BonsaiApplication    from "./app/Application"

var application = (<BonsaiApplication />);
window.Bonsai = application;

ReactDOM.render(
    application,
    document.getElementById('root')
);

