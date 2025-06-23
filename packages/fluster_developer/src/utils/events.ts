// TODO: Move all custom events to this file.
declare global {
    interface WindowEventMap {
        "panel-resize": CustomEvent<object>;
    }
}

export { };
