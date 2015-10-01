// Libraries
import React from "react"

// App Logic
import * as s   from "./api/socket"

import * as Constants       from "./alt/Constants"
import BonsaiAlt            from "./alt/AltInstance"
import BonsaiApplication    from "./alt/Application"
import Test                 from "./alt/components/Test"

let flux = new BonsaiAlt();

React.render(
    <BonsaiApplication flux={flux} />,
    document.getElementById('root')
);

setTimeout(function() {
    flux.getActions(Constants.Actions.SYSTEM).initialize();
}, 5000);