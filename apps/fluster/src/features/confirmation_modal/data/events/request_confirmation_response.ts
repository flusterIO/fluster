import { ConfirmationModalProps } from "#/confirmation_modal/types/confirmation_modal_types";

declare global {
     
    interface WindowEventMap {
        "request-confirmation-response": CustomEvent<ConfirmationModalProps>;
    }
}

export const requestConfirmationResponse = (
    confirmationProps: ConfirmationModalProps
) => {
    window.dispatchEvent(
        new CustomEvent("request-confirmation-response", {
            detail: confirmationProps,
        })
    );
};

export { };
