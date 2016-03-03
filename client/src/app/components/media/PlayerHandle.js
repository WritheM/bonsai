import React            from "react";

import DragHandle       from "../common/DragHandle";

export default function(props) {
    return (
        <div className="c-player-handle">
            <div className="e-icon" onClick={props.onClick}>
                {/* ? */}
            </div>
        </div>
    );
}
