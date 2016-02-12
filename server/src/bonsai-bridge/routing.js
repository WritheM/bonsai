// Engine State Controllers
import ConnectionController from "bonsai-engine/state/controllers/ConnectionController";

// Bridge Controllers
import ConnectionEmitController from "./controllers/ConnectionEmitController";

export function getControllers(store, tracker) {
    return [
        // State
        new ConnectionController(store),
        // Bridge
        new ConnectionEmitController(tracker)
    ];
}
