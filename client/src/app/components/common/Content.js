import React                from "react"

import * as Constants       from "../../Constants"
import { SmartComponent }   from "../../Components"

import Player               from "../media/Player"
import SocialPane           from "../social/SocialPane"

export default class Content extends SmartComponent {

    constructor() {
        super(...arguments);

        this.addActions({
            'session': Constants.Actions.SESSION
        });

        this.addStores({
            'ui': Constants.Stores.UI
        });

        this.state = {
            pageComponent: null
        };
    }


    onNewState(state) {
        if (state.ui) {
            this.setState({
                pageComponent: state.ui.pageComponent
            });
        }
    }

    render() {

        var PageComponent = this.state.pageComponent;
        var page = PageComponent ? <PageComponent /> : null;

        return (
            <div className="c-content">
                <div className="e-menu">
                    Menu Standin
                </div>
                <div className="e-main">
                    <div className="e-player">
                        <Player />
                    </div>
                    <div className="e-page">
                        {page}
                    </div>
                    <div className="e-queue">
                        Queue Standin
                    </div>
                </div>
                <div className="e-social">
                    <SocialPane />
                </div>
            </div>
        )

    }

}
