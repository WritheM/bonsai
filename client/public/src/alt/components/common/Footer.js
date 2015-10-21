import React from "react"

import * as Constants       from "../../Constants"
import { SmartComponent }   from "../../Components"

import PlayerBar            from "../media/PlayerBar"
import RoomSelector         from "./RoomSelector"

export default class Header extends SmartComponent {

    constructor() {
        super(...arguments);

        this.addActions({

        });

        this.addStores({
            'ui': Constants.Stores.UI
        });

        this.selfBindMethods([

        ]);

        this.state = {
            isSelectorExpanded: false
        }
    }


    onNewState(state) {
        if (state.ui) {
            this.setState({
                isSelectorExpanded: state.ui.menu.isOpen
            });
        }
    }

    render() {

        var roomSelectorProps = {
            'isExpanded': this.state.isSelectorExpanded
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