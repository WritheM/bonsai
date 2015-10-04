// Libraries
import React from "react"

// App Logic
import * as socket          from "./api/socket"

import * as Constants       from "./alt/Constants"
import BonsaiAlt            from "./alt/AltInstance"
import BonsaiApplication    from "./alt/Application"

let fluxConfig = {
    // Nothing here
};

let flux = new BonsaiAlt(fluxConfig, socket);

React.render(
    <BonsaiApplication flux={flux} />,
    document.getElementById('root')
);

