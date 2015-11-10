import {Controller,Route} from "./Controller";
import models from "../db/models";

import bcrypt from "bcryptjs";
import Sequelize from "sequelize";

export default class Session extends Controller {
    @Route("Session:register")
    async register(msg, conn) {

        let foundUser = null;

        foundUser = await models.User.findOne({
            where: {
                username: msg.username
            }
        });

        if (foundUser) {
            return {
                success: false,
                message: "An account with that username already exists."
            };
        }

        foundUser = await models.User.findOne({
            where: {
                email: msg.email
            }
        });

        if (foundUser) {
            return {
                success: false,
                message: "An account with that email already exists."
            };
        }

        let user = await models.User.create({
            username: msg.username,
            displayname: msg.displayname,
            email: msg.email,
            language: msg.language,
            password: bcrypt.hashSync(msg.password, 10 /* TODO: Config this */),
            joined: Date.now(),
            gRole: 0
        });

        if (user) {
            return {
                success: true,
                userId: user.id // Not sure if we need this yet...
            }
        }
    }

    @Route("Session:login")
    async login(msg, conn) {
        let user = await models.User.findOne({
            where: Sequelize.or(
                {username: msg.username},
                {email: msg.username}
            )
        });

        // TODO: Remove User/Password Indicator as it's not secure, this is for development purposes.
        if (!user) {
            throw new Error('Username* or Password not correct.');
        }

        if (!bcrypt.compareSync(msg.password, user.password)) {
            throw new Error('Username of Password* not correct.');
        }

        let s = await models.Auth.create({
            user_id: user.id,
            token: this.makeId(),
            created: Date.now(),
            last: Date.now()
        });

        return this.getLoginSnapshot(user, s);
    }

    @Route("Session:loginToken")
    async loginToken(msg, conn) {
        let s = await models.Auth.findOne({where: {token: msg.token}});
        if (!s) {
            throw new Error('No Session ' + msg.token);
        }
        let user = await models.User.findById(s.user_id);

        return this.getLoginSnapshot(user, s);
    }

    @Route("Session:logout")
    async logout(msg, conn) {
        let s = await models.Auth.findOne({where: {token: msg.token}});
        await s.destroy();

        return this.getLoginSnapshot();
    }

    @Route("Session:ping")
    async ping(msg, conn) {
        return this.getLoginSnapshot();
    }

    @Route("Session:joinRoom")
    async joinRoom(msg, conn) {
        return {
            room: {
                id: 1337,
                slug: "writhem",
                name: "writhem"
            },
            connections: [],
            media: []
        }
    }

    getLoginSnapshot(user, session) {

        user = user || {};
        session = session || {};

        let userClone = Object.assign({
            id: 0,
            username: 'Guest',
            displayname: 'Guest'
        }, {
            id: user.id,
            username: user.username,
            displayname: user.displayname
        });

        let sessionClone = Object.assign({
            id: 0,
            token: null
        }, {
            id: session.id,
            token: session.token
        });

        console.log('Derp', userClone, sessionClone);

        return {
            user: userClone,
            session: sessionClone
        };
    }

    //http://stackoverflow.com/a/1349426
    makeId() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

}