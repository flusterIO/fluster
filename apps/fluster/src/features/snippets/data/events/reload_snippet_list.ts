declare global {
    interface WindowEventMap {
        "reload-snippet-list": CustomEvent<{
            langs?: Record<string, boolean>;
        }>;
    }
}

export const reloadSnippetList = (langs?: Record<string, boolean>) => {
    window.dispatchEvent(
        new CustomEvent("reload-snippet-list", {
            detail: {
                langs,
            },
        })
    );
};

export { };
