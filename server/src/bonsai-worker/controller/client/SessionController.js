import bcrypt           from "bcryptjs";
import Sequelize        from "sequelize";

import {
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
            'client.session.loginToken': this.loginToken,
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
            throw new Error('Username* or Password not correct.');
        }

        if (!bcrypt.compareSync(password, user.password)) {
            throw new Error('Username of Password* not correct.');
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

        return { user: user.id, token };
    }

    async loginToken(message) {

        var { payload, context } = message;
        var { token } = payload;

        let session = await models.Auth.findOne({where: {token: token}});
        if (!session) {
            throw new Error('No Session ' + msg.token);
        }

        let user = await models.User.findById(session.user_id);

        return { user: user.id, token };
    }

    async logout(message) {

        var { payload, context } = message;
        var { token } = payload;

        var token = conn.session.token || msg.token;

        if (!token) {
            throw new Error("Unknown Session, cannot log out session.");
        }

        let s = await models.Auth.findOne({where: {token: token}});

        if (!s) {
            throw new Error("Cannot find session.");
        }

        await s.destroy();

        return this.getLoginSnapshot();

    }

    async ping(message) {

    }
}
