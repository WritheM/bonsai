import AltInstance from "./AltInstance"

export function isBonsaiInstance(props, propName, componentName) {
    return props[propName] && props[propName] instanceof AltInstance;
}
