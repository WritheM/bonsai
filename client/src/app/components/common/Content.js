import React                from "react";
import { connect }          from "react-redux";

import Player               from "../media/Player"
import SocialPane           from "../social/SocialPane"

class Content extends React.Component {

    render() {
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
                        {this.props.children}
                    </div>
                    <div className="e-queue">
                        Queue Standin
                    </div>
                </div>
                <div className="e-social">
                    <SocialPane />
                </div>
            </div>
        );
    }

}

export default connect(state => ({
    // TODO
}))(Content);