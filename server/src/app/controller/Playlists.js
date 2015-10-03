import {Controller,Route} from "./Controller";
import models from "../db/models";

export default class Playlists extends Controller {
    @Route("playlist:create")
    async add(msg, conn) {

        let playlist = await models.Playlist.create({
            name: msg.name,
            user_id: msg.userid
        });
        return playlist;
    }

    @Route("playlist:delete")
    async del(msg, conn) {
        let playlist = await models.Playlist.findById(msg.id);
        return await playlist.destroy();
    }

    @Route("playlist:patch")
    @Route("playlist:update")
    async patch(msg, conn) {
        let playlist = await models.Playlist.findById(msg.id);
        if (msg.name)
            playlist.name = msg.name;
        return await playlist.save();
    }

    @Route("playlist.read")
    async list(msg, conn) {
        let playlists = await models.Playlist.findAll({
            where: {
                user_id: msg.user_id || conn.user_id
            }
        });
        return playlists;
    }
}