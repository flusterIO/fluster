export const showEquationDetailModal = (id: string) => {
    window.dispatchEvent(
        new CustomEvent("show-equation-detail-modal", {
            detail: {
                id,
            },
        })
    );
};
