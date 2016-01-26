import bcrypt           from "bcrypt";
import Sequelize        from "sequelize";

import {
    uuid
}                       from "bonsai-engine/utilities";

import {
    createRoutes
}                       from "bonsai-engine/routing";

export default class UserController {

    constructor(tracker, models) {
        this.tracker = tracker;
        this.models = models;

        this.routes = createRoutes(this, {
            'client.user.register': this.register
        });
    }

    async register(message) {
        var { payload, context } = message;
        var {
            email,
            username,
            displayname,
            language,
            password
        } = payload;
        var { connection } = context;

        let foundUser = null;

        foundUser = await this.models.User.findOne({
            where: {
                username: username
            }
        });

        if (foundUser) {
            return {
                success: false,
                message: "An account with that username already exists."
            };
        }

        foundUser = await this.models.User.findOne({
            where: {
                email: email
            }
        });

        if (foundUser) {
            return {
                success: false,
                message: "An account with that email already exists."
            };
        }

        let user = await this.models.User.create({
            username: username,
            displayname: displayname,
            email: email,
            language: language,
            password: bcrypt.hashSync(password, 10 /* TODO: Config this */),
            joined: Date.now(),
            gRole: 0
        });

        if (user) {
            return {
                success: true,
                userId: user.id // Not sure if we need this yet...
            };
        } else {
            return {
                success: false,
                reason: 'No user was created.'
            };
        }

    }

};