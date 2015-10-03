import {Controller,Route} from "./Controller";
import models from "../db/models";

export default class Session extends Controller {
    @Route("Session:register")
    async register(msg, conn) {
        let user = await models.User.create({
            username: msg.username,
            slug: msg.username,
            language: msg.username,
            joined: Date.now(),
            gRole: 0
        });
        return user;
    }

    @Route("Session:login");
    async login(msg, conn) {
        let s = await models.User.findOne({where: {username: msg.username}});
        //TODO: password

        let s = await models.Auth.create({
            user_id: user.id,
            token: this.makeId(),
            created: Date.now(),
            last: Date.()
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

    //http://stackoverflow.com/a/1349426
    makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

}