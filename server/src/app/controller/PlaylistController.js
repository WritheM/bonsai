import {Controller,Route} from "./Controller";
import models from "../db/models";

console.log(Controller);

export default class PlaylistController extends Controller {
    @Route("playlist.add")
    async add(msg) {
        new models.Playlist()
    }


}