import React        from "react"

import * as Constants from "../../Constants"
import Component    from "../../Component";

export default class Content extends Component {


    getRequiredActions() {
        return {
            'session': Constants.Actions.SESSION
        }
    }

    render() {

        var goRegister = () => {
            this.actions.session.registerBegin();
        };

        var goLogin = () => {
            this.actions.session.loginBegin();
        };

        return (
            <div>
                <a href="#" onClick={goRegister}>Register</a>
                <span>-</span>
                <a href="#" onClick={goLogin}>Login</a>
           </div>
        )

    }

}
