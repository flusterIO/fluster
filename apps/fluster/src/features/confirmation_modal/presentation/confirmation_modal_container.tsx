import React, { useState, type ReactNode } from "react";
import ConfirmationModal from "./main";
import { ConfirmationModalProps } from "../types/confirmation_modal_types";
import { useEventListener } from "@/hooks/use_event_listener";

const ConfirmationModalContainer = (): ReactNode => {
    const [data, setData] = useState<ConfirmationModalProps | null>(null);
    useEventListener("request-confirmation-response", (e) => {
        setData(e.detail);
    });
    useEventListener("cancel-confirmation-request", (e) => {
        if (data !== null && e.detail.id === data?.id) {
            setData(null);
        }
    });

    if (data === null) {
        return null;
    }
    return <ConfirmationModal handleClose={() => setData(null)} {...data} />;
};

ConfirmationModalContainer.displayName = "ConfirmationModalContainer";

export default ConfirmationModalContainer;
