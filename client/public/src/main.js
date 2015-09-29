// App
import * as s from "./api/socket";

// UI
import React from "react"
import * as Shell from "./ui/components/shell"

// Temporary, let's render the chrome to the root element
React.render(<Shell />, document.getElementById('root'));