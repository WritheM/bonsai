import SessionApiModule     from "./SessionApiModule";
import SystemApiModule      from "./SystemApiModule";

export function appModulesFactory(
    dispatch,
    getState
) {
    return [
        new SessionApiModule(dispatch),
        new SystemApiModule(dispatch, getState)
    ];
}
