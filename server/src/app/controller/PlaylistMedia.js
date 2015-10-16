import {Controller,Route} from "./Controller";
import models from "../db/models";

export default class PlaylistMedia extends Controller {
    @Route("playlist.media:read")
    async list(msg, conn) {
        let [playlist,media] = await Promise.all([
            models.Playlist.findById(msg.playlist_id),
            models.PlaylistMedia.findAll({
                where: {
                    playlist_id: msg.playlist_id
                }
            })]);


        let index = {};
        media.forEach(m => {
            index[m.id] = m;
        });

        let current_id = playlist.next_id;
        let list = [];
        while (true) {
            let current = index[current_id];
            if (!current)
                break;

            delete index[current_id];
            current_id = current.next_id;

            list.push(current);
        }

        //lost + found, just shove anything found onto back :/
        for (let i in index) {
            let m = index[i];
            await this.addMedia(playlist, m);
            list.push(m);
        }

        return list;
    }

    @Route("playlist.media:add")
    async add(msg, conn) {
        let playlist = await models.Playlist.findById(msg.playlist_id);
        //permissions checks here

        //partially save media so that we have an ID to deal with.
        let media = await models.PlaylistMedia.create({
            playlist_id: msg.playlist_id,
            duration: msg.duration,
            mediatype: msg.mediatype,
            medialoc: msg.medialoc,
            title: msg.title,
            next_id: msg.before
        });

        this.addMedia(playlist, media);

        return media;
    }

    async addMedia(playlist, media) {
        //todo: support adding lists of media
        let after = await models.PlaylistMedia.findById(media.next_id);
        if (!after)
            after = playlist;
        let before = await models.PlaylistMedia.findById(after.previous_id);
        if (!before)
            before = playlist;

        if (after instanceof models.PlaylistMedia.Instance)
            media.next_id = after.id;
        else
            media.next_id = null;
        if (before instanceof models.PlaylistMedia.Instance)
            media.previous_id = before.id;
        else
            media.previous_id = null;

        before.next_id = media.id;
        after.previous_id = media.id;

        var save = [
            playlist.save(), //might be able to get away with not saving if after != before != playlist
            media.save()
        ];

        if (after !== playlist)
            save.push(after.save());
        if (before !== playlist)
            save.push(before.save());

        await Promise.all(save);
    }

    @Route("playlist.media:patch")
    @Route("playlist.media:update")
    async patch(msg, conn) {
        let playlist = await models.PlaylistMedia.findById(msg.id);

        //apply columns
        ["duration", "mediatype", "medialoc", "title"].forEach(i => {
            if (msg[i]) {
                playlist[i] = msg[i];
            }
        });

        return await playlist.save();
    }

    @Route("playlist.media:delete")
    async del(msg, conn) {
        //see if this can be optimised?
        // current approach:
        //  * 4 selects, (playlist, media, before el, after el)
        //  * 1 delete, (media entry)
        //  * 2 updates (to update pointers, just 1 if deletion was last item)


        let [playlist, media] = await Promise.all([
            models.Playlist.findById(msg.playlist_id),
            models.PlaylistMedia.findById(msg.id)
        ]);

        let [before, after] = await Promise.all([
            models.PlaylistMedia.findById(media.previous_id),
            models.PlaylistMedia.findById(media.next_id)
        ]);
        if (!before)
            before = playlist;
        if (!after)
            after = playlist;

        if (before == after) { //then playlist is empty and both ends are playlist..
            playlist.previous_id = null;
            playlist.next_id = null;
        }
        else {
            after.previous_id = (before != playlist) ? before.id : null;
            before.next_id = (after != playlist) ? after.id : null;
        }

        let wait = [
            media.destroy()
        ];
        if (before == playlist || after == playlist)
            wait.push(playlist.save());
        if (before != playlist)
            wait.push(before.save());
        if (after != playlist)
            wait.push(after.save());

        await Promise.all(wait);
        return true;
    }
}