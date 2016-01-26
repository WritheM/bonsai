// Engine State Controllers
import ConnectionController from "bonsai-engine/state/controllers/ConnectionController";

export function getControllers(store) {
    return [
        new ConnectionController(store)
    ];
}
