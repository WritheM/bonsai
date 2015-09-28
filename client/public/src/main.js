import * as s from "./api/socket";

export var Playlist = s.Model.extend({
    url: "playlist"
});

export var Playlists = s.Collection.extend({
    url: "playlist",
    model: Playlist
});

var c = new Playlists();
window.c = c;
c.fetch();
//c.create({name:"test"});