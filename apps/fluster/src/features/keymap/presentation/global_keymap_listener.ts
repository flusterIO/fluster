import React, { useEffect, type ReactNode } from "react";
import { KeymapId } from "../data/models/keymap_ids";
import { keymapActions } from "../data/models/keymap_actions";

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
