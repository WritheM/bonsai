import socket from "../socket.js";
import Playlist from "../models/Playlist";

var Playlists = socket.Collection.extend({
    model: Playlist
});


export default Playlists;