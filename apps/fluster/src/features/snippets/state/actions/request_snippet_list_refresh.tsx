export const requestSnippetListRefresh = () => {
    window.dispatchEvent(new CustomEvent("reload-snippet-list", {}));
};
