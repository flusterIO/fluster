import { cancelConfirmationRequest } from "#/confirmation_modal/data/events/cancel_confirmation_request";
import { requestConfirmationResponse } from "#/confirmation_modal/data/events/request_confirmation_response";
import { ConfirmationModalProps } from "#/confirmation_modal/types/confirmation_modal_types";
import { useEventListener } from "@/hooks/use_event_listener";
import { useState } from "react";

export const useConfirmation = (
    props: ConfirmationModalProps,
    onAccept: () => void,
    onDeny?: () => void
) => {
    const [show, setShow] = useState(false);

    useEventListener("confirmation-response", (e) => {
        if (e.detail.id === props.id) {
            if (e.detail.response) {
                onAccept();
            } else {
                if (onDeny) {
                    onDeny();
                }
            }
        }
    });

    return {
        visible: show,
        /// Show or hide the confirmation modal.
        setVisible: (shouldShow: boolean) => {
            if (shouldShow) {
                setShow(true);
                requestConfirmationResponse(props);
            } else {
                setShow(true);
                cancelConfirmationRequest(props.id);
            }
        },
    };
};
