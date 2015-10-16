import React from "react"

import { DumbComponent }    from "../../Components"
import YoutubePlayer        from "./YoutubePlayer"

export default class Player extends DumbComponent {

    constructor() {
        super(...arguments);

        this.refresh = this.refresh.bind(this);
        this.state = {
            derp: 1
        };
    }

    refresh() {
        this.setState({derp: this.state.derp + 1});
    }

    render() {
        return (

            <div className="c-player">
                <div className="e-screen">
                    <YoutubePlayer derp={this.state.derp} />
                </div>
                <div className="e-controls">
                    <a href="#" onClick={this.refresh}>Refresh State</a>
                </div>
            </div>

        );
    }
}