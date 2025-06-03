export const requestEquationListRefresh = () => {
    window.dispatchEvent(new CustomEvent("request-equation-list-refresh", {}));
};
