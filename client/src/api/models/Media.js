import socket from "../socket.js";
import PlaylistMedia from "../collections/PlaylistMedia";

var Media = socket.Model.extend({
    url: "media"
});

export default Media;
