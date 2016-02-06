import {Route} from "bonsai-engine/routing"
import models from "bonsai-engine/db/models"
import Controller from "./../../bonsai-engine/routing/Controller";

export default class Media extends Controller {
    //@Route("media:create")
    async add(msg, conn) {

        let media = await models.Media.create({
            name: msg.name,
            user_id: msg.userid
        });
        return media;
    }

    //@Route("media:delete")
    async del(msg, conn) {
        let media = await models.Media.findById(msg.id);
        return await media.destroy();
    }

    //@Route("media:patch")
    //@Route("media:update")
    async patch(msg, conn) {
        let media = await models.Media.findById(msg.id);
        if (msg.name)
            media.name = msg.name;
        return await media.save();
    }

    //@Route("media.read")
    async list(msg, conn) {
        let medias = await models.Media.findAll({
            where: {
                user_id: msg.user_id || conn.user_id
            }
        });
        return medias;
    }
}
