interface EventProps { }

declare global {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface WindowEventMap {
        "reload-snippet-list": CustomEvent<EventProps>;
    }
}

export const reloadSnippetList = () => {
    window.dispatchEvent(new CustomEvent("reload-snippet-list", {}));
};

export { };
