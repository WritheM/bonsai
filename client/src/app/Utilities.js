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

const charsetStandard = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const charsetHexadecimal = "ABCDEF0123456789";

export function randString(length, charset = charsetStandard) {
    var bucket = [];

    for(let i = 0; i < length; i++) {
        let charIndex = Math.floor(Math.random() * charset.length);
        bucket.push(charset[charIndex]);
    }

    return bucket.join("");
}

export function randHexString(length) {
    return randString(length, charsetHexadecimal);
}