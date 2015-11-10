
// Note: It's probably worth abstracting this later, we need
// a stand-in for now. This will do.

let Keys = {
    TOKEN: 'bonsai_token'
};

class StorageHandler {
    constructor() {
        if (!window) {
            throw "StorageHandler can't be used outside of a web context... yet";
        }

        if (!localStorage) {
            throw "StorageHandler can't be used without localStorage... yet";
        }
    }

    get sessionToken() {
        return localStorage.getItem(Keys.TOKEN);
    }

    set sessionToken(token) {
        // Because local storage can't actually set null :(
        if (token) {
            localStorage.setItem(Keys.TOKEN, token);
        } else {
            localStorage.removeItem(Keys.TOKEN);
        }
    }
}

let instance = new StorageHandler();
instance.derp = 2;

// TODO: Evaluate using this as a singleton
export default instance;
