interface EventProps {
    /// True if the confirmation was accepted, false otherwise.
    response: boolean;
    /// The confirmation id.
    id: string;
}

declare global {
     
    interface WindowEventMap {
        "confirmation-response": CustomEvent<EventProps>;
    }
}

export const sendConfirmationResponse = (
    wasAccepted: boolean,
    confirmationId: string
) => {
    window.dispatchEvent(
        new CustomEvent("confirmation-response", {
            detail: {
                response: wasAccepted,
                id: confirmationId,
            },
        })
    );
};

export { };
