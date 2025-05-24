import { ConfirmationModalProps } from "#/confirmation_modal/types/confirmation_modal_types";

declare global {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
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
