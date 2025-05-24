import { useState } from "react";

export const useConfirmation = (
    id: string,
    onAccept: () => void,
    onDeny: () => void
) => {
    const [show, setShow] = useState(false);

    return {
        visible: show,
        /// Show or hide the confirmation modal.
        setVisible: setShow,
    };
};
