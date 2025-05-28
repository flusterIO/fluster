import { KeymapId } from "../data/models/keymap_ids";
import { KeymapItem } from "../data/models/keymap_item";
import { KeymapState } from "./keymap_state";

export const initialKeymapState: KeymapState = {
  [KeymapId.syncDirectory]: new KeymapItem(
    false,
    true,
    false,
    false,
    "b"
  ).toString(),
  [KeymapId.showCommandPalette]: new KeymapItem(
    false,
    true,
    false,
    false,
    "p"
  ).toString(),
  [KeymapId.togglePanelLeft]: new KeymapItem(
    true,
    true,
    false,
    false,
    "l"
  ).toString(),
  [KeymapId.togglePanelRight]: new KeymapItem(
    true,
    true,
    false,
    false,
    "r"
  ).toString(),
  [KeymapId.togglePanelBottom]: new KeymapItem(
    true,
    true,
    false,
    false,
    "t"
  ).toString(),
  [KeymapId.editorCommandPalette]: new KeymapItem(
    true,
    true,
    false,
    false,
    "p"
  ).toString(),
};
