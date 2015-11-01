import {Controller,Route} from "./Controller";
import models from "../db/models";

import bcrypt from "bcryptjs";

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
        let user = await models.User.findOne({where: {username: msg.username}});
        //TODO: password

        let s = await models.Auth.create({
            user_id: user.id,
            token: this.makeId(),
            created: Date.now(),
            last: Date.now()
        });

        return {user: user, session: s};
    }

    @Route("Session:loginToken")
    async loginToken(msg, conn) {
        let s = await models.Auth.findOne({where: {token: msg.token}});
        let user = await models.Auth.findById(s.user_id);
        return {user: user, session: s};
    }

    @Route("Session:logout")
    async logout(msg, conn) {
        let s = await models.Auth.findOne({where: {token: msg.token}});
        await s.destroy();
        return true;
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

    //http://stackoverflow.com/a/1349426
    makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

}