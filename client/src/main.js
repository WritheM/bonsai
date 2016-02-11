// Libraries
import React        from "react"
import ReactDOM     from "react-dom"

import BonsaiApplication    from "./app/Application"

var application = (<BonsaiApplication ref={(r) => window.Bonsai = r} />);

ReactDOM.render(
    application,
    document.getElementById('root')
);

