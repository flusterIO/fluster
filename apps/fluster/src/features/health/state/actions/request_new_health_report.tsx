export const requestNewHealthReport = () => {
    window.dispatchEvent(
        new CustomEvent("request-new-health-report", {
            detail: {},
        })
    );
};
