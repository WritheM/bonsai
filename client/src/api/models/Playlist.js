import socket from "../socket.js";
import PlaylistMedia from "../collections/PlaylistMedia";

 var Playlist = socket.Model.extend({
     url: "playlist",
     getMedia: function() {
         return new PlaylistMedia().fetch({attrs:{id:this.id}});
     }
 });

export default Playlist;