import BonsaiAlt from "./alt"

export function isBonsaiInstance(props, propName, componentName) {
    return props[propName] && props[propName] instanceof BonsaiAlt;
}
