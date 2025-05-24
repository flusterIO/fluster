interface EventProps {
    id: string;
}
declare global {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface WindowEventMap {
        "cancel-confirmation-request": CustomEvent<EventProps>;
    }
}

export const cancelConfirmationRequest = (id: string): void => {
    window.dispatchEvent(
        new CustomEvent("cancel-confirmation-request", {
            detail: {
                id,
            },
        })
    );
};

export { };
