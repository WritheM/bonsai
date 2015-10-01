// Libraries
import React from "react"

// App Logic
import * as s   from "./api/socket"

import * as Constants       from "./alt/constants"
import BonsaiAlt            from "./alt/alt"
import BonsaiApplication    from "./alt/application"
import Test                 from "./alt/components/test"

let flux = new BonsaiAlt();

React.render(
    <BonsaiApplication flux={flux} />,
    document.getElementById('root')
);

setTimeout(function() {
    flux.getActions(Constants.Actions.SYSTEM).initialize();
}, 5000);