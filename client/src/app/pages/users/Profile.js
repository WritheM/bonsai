import React from "react";
import { connect } from "react-redux";

const Profile = (props) => (
    <div>

        <h2>Profile Page</h2>

        <p>
            This is the current user's profile.
        </p>

        {/* TODO: Include User Detail Components */}

    </div>
);

export default connect(
    // TODO
)(Profile);