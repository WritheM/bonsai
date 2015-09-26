import {Controller,Route} from "./Controller";
import models from "../db/models";

export default class PlaylistController extends Controller {
    @Route("playlist.add")
    async add(msg, conn) {

        let playlist = await models.Playlist.create({
            name: msg.name,
            user_id: msg.userid
        });
        return playlist;
    }

    @Route("playlist.del")
    async del(msg, conn) {
        let playlist = await models.Playlist.findById(msg.id);
        return await playlist.destroy();
    }

    @Route("playlist.patch")
    async patch(msg, conn) {
        let playlist = await models.Playlist.findById(msg.id);
        if (msg.name)
            playlist.name = msg.name;
        return await playlist.save();
    }

}