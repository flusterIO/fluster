import { useEventListener } from "@fluster.io/dev";
import store from "./store";

declare global {
    interface WindowEventMap {
        "log-state": CustomEvent<object>;
    }
}

export const useDevelopmentLogger = (): null => {
    useEventListener("log-state", () => {
        const state = store.getState();
        console.log(state);
    });
    return null;
};
