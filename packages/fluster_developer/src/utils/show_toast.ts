import { v4 as uuidv4 } from "uuid";
import { ShowToast } from "../lib/bindings";

export const showToast = (data: Omit<ShowToast, "id">) => {
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
