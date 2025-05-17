import { KeymapId } from "../data/models/keymap_ids";
import { KeymapItem } from "../data/models/keymap_item";
import { KeymapState } from "./keymap_state";

export const initialKeymapState: KeymapState = {
  [KeymapId.syncDirectory]: new KeymapItem(
    false,
    true,
    false,
    false,
    "keyB",
  ).toString(),
  [KeymapId.showCommandPalette]: new KeymapItem(
    false,
    true,
    false,
    false,
    "keyP",
  ).toString(),
};
