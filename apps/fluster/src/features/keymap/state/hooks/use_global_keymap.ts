import { keymapActions } from "#/keymap/data/models/keymap_actions";
import { KeymapId } from "#/keymap/data/models/keymap_ids";
import { KeymapItem } from "#/keymap/data/models/keymap_item";
import { AppState } from "@/state/initial_state";
import { useEffect, useMemo } from "react";
import { shallowEqual, useSelector } from "react-redux";

const stateToKeyRecord = (
  state: AppState["keymap"],
): Record<KeymapId, KeymapItem> => {
  let data: Record<KeymapId, KeymapItem> = {} as Record<KeymapId, KeymapItem>;
  for (const keymap_id in state) {
    data[keymap_id as unknown as KeymapId] = KeymapItem.fromString(
      state[keymap_id as unknown as KeymapId],
    );
  }
  return data;
};

export const useGlobalKeymap = () => {
  const globalKeymap = useSelector((state: AppState) => state.keymap, {
    equalityFn: shallowEqual,
  });
  const keymapData = useMemo(
    () => stateToKeyRecord(globalKeymap),
    [globalKeymap],
  );

  const handleKeyDown = (e: KeyboardEvent): void => {
    for (const entry_id in keymapData) {
      let entry = keymapData[entry_id as unknown as KeymapId];
      if (
        entry.key === e.key &&
        entry.alt === e.altKey &&
        entry.meta === e.metaKey &&
        entry.shift === e.shiftKey &&
        entry.ctrl === e.ctrlKey
      ) {
        keymapActions[entry_id as unknown as KeymapId]();
      }
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keymapData]);
  return null;
};
