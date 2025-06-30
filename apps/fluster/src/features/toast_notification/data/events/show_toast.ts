// import { ToastItem } from "#/toast_notification/state/toast_state";
import { ToastItem } from "#/toast_notification/types";
export { showToast } from "@fluster.io/dev";

// TODO: Move this to the shared events map in the developer pckage.
declare global {
    interface WindowEventMap {
        "show-toast": CustomEvent<ToastItem>;
    }
}
