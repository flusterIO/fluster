declare global {
    interface WindowEventMap {
        "reload-snippet-list": CustomEvent<object>;
    }
}

export const reloadSnippetList = () => {
    window.dispatchEvent(new CustomEvent("reload-snippet-list", {}));
};

export { };
