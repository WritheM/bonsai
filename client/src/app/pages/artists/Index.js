import React from "react";
import { connect } from "react-redux";

const Index = (props) => (
    <div>
        <h2>Artist List & Lookup</h2>

        <p>
            This page would be a hub for looking up artists.
        </p>
    </div>
);

export default connect(
    // TODO
)(Index);