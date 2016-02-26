import React from "react";
import { connect } from "react-redux";

const Index = (props) => (
    <div>
        <h2>Album List & Lookup</h2>

        <p>
            This page would be a hub for looking up albums.
        </p>
    </div>
);

export default connect(
    // TODO
)(Index);