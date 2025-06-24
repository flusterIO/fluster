// TODO: Move all custom events to this file.
interface PanelResizeEventProps {
    panel: "left" | "right";
}

declare global {
    interface WindowEventMap {
        "panel-resize": CustomEvent<PanelResizeEventProps>;
    }
}

export { };
