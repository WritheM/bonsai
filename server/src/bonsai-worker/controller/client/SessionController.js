import bcrypt           from "bcryptjs";
import Sequelize        from "sequelize";

import {
    makeFailure,
    uuid
}                       from "bonsai-engine/utilities";

import {
    createRoutes
}                       from "bonsai-engine/routing";

export default class SessionController {

    constructor(tracker, models) {
        this.tracker = tracker;
        this.models = models;

        this.routes = createRoutes(this, {
            'client.session.login': this.login,
            'client.session.login-token': this.loginToken,
            'client.session.logout': this.logout,
            'client.session.ping': this.ping
        });
    }

    async login(message) {

        var { payload, context } = message;
        var { username, password } = payload;
        var { connection } = context;

        let user = await this.models.User.findOne({
            where: Sequelize.or(
                {username: username},
                {email: username}
            )
        });

        // TODO: Remove User/Password Indicator as it's not secure, this is for development purposes.
        if (!user) {
            return makeFailure(
                `Username* or Password is not correct.`
            );
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return makeFailure(
                `Username or Password* is not correct.`
            );
        }

        var token = uuid();
        let s = await this.models.Auth.create({
            user_id: user.id,
            token,
            created: Date.now(),
            last: Date.now()
        });

        // Update state
        this.tracker
            .connection(connection)
            .attachSession(token, user.id);

        return { success: true };
    }

    async loginToken(message) {

        var { payload, context } = message;
        var { token } = payload;
        var { connection } = context;

        let session = await this.models.Auth.findOne({where: {token: token}});
        if (!session) {
            return makeFailure(
                `No Session '${token}' found.`
            );
        }

        let user = await this.models.User.findById(session.user_id);

        this.tracker
            .connection(connection)
            .attachSession(token, user.id);

        return { success: true };
    }

    async logout(message) {

        var { context } = message;
        var { connection, session } = context;

        var token = session;

        if (!token) {
            return makeFailure(
                `Connection has no session data, cannot log out.`
            );
        }

        let s = await this.models.Auth.findOne({where: {token: token}});
        if (!s) {
            // The session was missing from the database but the connection
            // still thinks it's connected, let's clean this up.

            this.tracker
                .connection(connection)
                .detachSession();

            return makeFailure(
                `Unable to find session, cannot log out.`
            );
        }

        await s.destroy();

        // Notify the system.
        this.tracker
            .connection(connection)
            .detachSession();

        return { success: true };
    }

    async ping(message) {

    }
}
