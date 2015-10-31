export var isDebug = true;

export function debug() {
    if (isDebug)
        console.log("[BONSAI-DEBUG]", ...arguments);
}