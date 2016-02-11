import SystemApiModule from "./SystemApiModule";

export function appModulesFactory(dispatch) {
    return [
        new SystemApiModule(dispatch)
    ];
}
