export var isDebug = true;

export function debug() {
    if (isDebug)
        console.log("[BONSAI-DEBUG]", ...arguments);
}

export function ensureString(key, value, isEmptyAllowed = false) {
    if (!value || value === '') {
        if (!isEmptyAllowed) {
            throw new Error(`The value '${key}' cannot be empty.`);
        }

        return;
    }

    if (typeof value !== "string") {
        throw new Error(`The value '${key}' must be a string.`);
    }
}