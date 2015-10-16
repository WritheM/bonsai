import React from "react"

import { DumbComponent } from "../../Component"

export default class YoutubePlayer extends DumbComponent {
    render() {
        return (

            <div className="c-youtube-player">
                <div className="e-player">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/3TAUnYZpMbA" frameborder="0" allowfullscreen></iframe>
                </div>

                <div>
                    Derp: {this.props.derp}
                </div>
            </div>

        );
    }
}



