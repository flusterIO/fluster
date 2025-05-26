import { KeymapId } from "#/keymap/data/models/keymap_ids";
import { useSelector } from "react-redux";
import { AppState } from "@/state/initial_state";
import { KeymapItem } from "#/keymap/data/models/keymap_item";

export const useKeymap = (id: KeymapId): KeymapItem | undefined => {
  return useSelector((state: AppState) => {
    const s = state.keymap[id];
    if (typeof s === "string") {
      return KeymapItem.fromString(s);
    } else {
      return undefined;
    }
  });
};
