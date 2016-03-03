import React            from "react";

import DragHandle       from "../common/DragHandle";

export default function(props) {
    return (
        <DragHandle {...props}>
            <div className="c-player-handle">
                <div className="e-icon">
                    {/* ? */}
                </div>
            </div>
        </DragHandle>
    );
}
