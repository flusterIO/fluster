import { KeyboardEvent } from "react";

export const onEnter = (
    e: KeyboardEvent<HTMLInputElement>,
    callback: (e: KeyboardEvent<HTMLInputElement>) => void,
    ignore?: "all" | "onEnter"
) => {
    if (ignore === "all") {
        e.preventDefault();
        e.stopPropagation();
    }
    if (e.key === "Enter") {
        if (ignore === "onEnter") {
            e.preventDefault();
            e.stopPropagation();
        }
        callback(e);
    }
};
