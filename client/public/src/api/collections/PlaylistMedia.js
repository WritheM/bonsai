import socket from "../socket.js";
import Playlist from "../models/Playlist";

var Playlists = socket.Collection.extend({
    model: Playlist.media
});

export default Playlists;