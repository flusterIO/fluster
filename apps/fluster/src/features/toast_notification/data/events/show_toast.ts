// import { ToastItem } from "#/toast_notification/state/toast_state";
import { ToastItem } from "#/toast_notification/types";
import { v4 as uuidv4 } from "uuid";

declare global {
    interface WindowEventMap {
        "show-toast": CustomEvent<ToastItem>;
    }
}

export const showToast = (data: Omit<ToastItem, "id">) => {
    window.dispatchEvent(
        new CustomEvent("show-toast", {
            detail: {
                ...data,
                id: uuidv4(),
            },
        })
    );
    // return ;
};
