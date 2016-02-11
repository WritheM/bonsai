import React            from "react";
import { connect }      from "react-redux";

import PlayerBar            from "../media/PlayerBar"
import RoomSelector         from "./RoomSelector"

class Footer extends React.Component {

    get isRoomExpanded() {
        return this.props.ui.menu.isOpen;
    }

    render() {

        var roomSelectorProps = {
            'isExpanded': this.isRoomExpanded
            // TODO: More stuff for the expander
        };

        return (

            <div id="bonsaiFooter" className="c-shell-footer">
                <div className="e-room-select">
                    <RoomSelector {...roomSelectorProps} />
                </div>
                <div className="e-player">
                    <PlayerBar />
                </div>
            </div>

        );
    }
}

export default connect(state => ({
    ui: state.ui
}))(Footer);