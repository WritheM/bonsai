import React from "react";
import { connect } from "react-redux";

const Details = (props) => (
    <div>

        <h2>Details Page</h2>

        <p>
            This is the provided album's profile.
        </p>

        {/* TODO: Include Album Detail Components */}

    </div>
);

export default connect(
    // TODO
)(Details);