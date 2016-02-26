import React                from "react";
import { connect }          from "react-redux";
import { Link }             from "react-router";

import Player               from "../media/Player"
import SocialPane           from "../social/SocialPane"

class Content extends React.Component {

    render() {
        return (
            <div className="c-content">
                <div className="e-menu">
                    Menu Standin

                    <div>
                        <ul>
                            <li><Link to="/">Homepage</Link></li>
                            <li><Link to="/albums">Album Index</Link></li>
                            <li><Link to="/albums/234">Album Details</Link></li>
                            <li><Link to="/artists">Artist Index</Link></li>
                            <li><Link to="/artists/345">Artist Details</Link></li>
                            <li><Link to="/songs">Song Index</Link></li>
                            <li><Link to="/songs/345">Song Details</Link></li>
                            <li><Link to="/rooms">Room Index</Link></li>
                            <li><Link to="/rooms/345">Room Details</Link></li>
                            <li><Link to="/users">User Index</Link></li>
                            <li><Link to="/users/profile">User Profiles</Link></li>
                            <li><Link to="/users/345">User Details</Link></li>
                        </ul>
                    </div>

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