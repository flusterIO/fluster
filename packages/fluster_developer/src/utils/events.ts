// TODO: Move all custom events to this file.
interface PanelResizeEventProps {
    width: number;
}

declare global {
    interface WindowEventMap {
        "main-panel-resize": CustomEvent<PanelResizeEventProps>;
    }
}

export { };
