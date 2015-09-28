import Backbone from "backbone";
import Playlist from "../models/Playlist";

export var Playlists = Backbone.Collection.extend({
    model: Playlist
});