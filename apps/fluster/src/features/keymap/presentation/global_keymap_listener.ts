import React, { useEffect, type ReactNode } from "react";
import { keymapActions } from "./keymap_actions";
import { KeymapId } from "../data/models/keymap_ids";

const useGlobalKeymap = (
    shift: boolean,
    meta: boolean,
    ctrl: boolean,
    whichKey: number,
    id: KeymapId,
) => {
    const handleKeyPress = (e: KeyboardEvent): void => {
        if (
            e.which == whichKey &&
            e.shiftKey == shift &&
            e.metaKey == meta &&
            e.ctrlKey == ctrl
        ) {
            keymapActions[id]();
        }
    };
    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, []);
};

// RESUME: Come back here and implement the keymap as part of loop. That might be a more reliable approach than remembering to come back here every time a new keymap function is created.
const GlobalKeymap = (): ReactNode => {
    return null;
};

GlobalKeymap.displayName = "GlobalKeymap";

export default GlobalKeymap;
