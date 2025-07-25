import { KeymapId } from "../data/models/keymap_ids";
import { KeymapItem } from "../data/models/keymap_item";
import { KeymapState } from "./keymap_state";

export const initialKeymapState: KeymapState = {
    [KeymapId.syncDirectory]: new KeymapItem(
        false,
        true,
        false,
        false,
        "b",
        "Sync directory without AI"
    ).toString(),
    [KeymapId.showCommandPalette]: new KeymapItem(
        false,
        true,
        false,
        false,
        "p",
        "Show command palette"
    ).toString(),
    [KeymapId.togglePanelLeft]: new KeymapItem(
        true,
        true,
        false,
        false,
        "l",
        "Toggle left panel"
    ).toString(),
    [KeymapId.togglePanelRight]: new KeymapItem(
        true,
        true,
        false,
        false,
        "r",
        "Toggle right panel"
    ).toString(),
    [KeymapId.togglePanelBottom]: new KeymapItem(
        true,
        true,
        false,
        false,
        "t",
        "Toggle panel bottom (beta)"
    ).toString(),
    [KeymapId.editorCommandPalette]: new KeymapItem(
        true,
        true,
        false,
        false,
        "p",
        "Show editor command palette"
    ).toString(),
    [KeymapId.scrollDown]: new KeymapItem(
        false,
        false,
        false,
        false,
        "j",
        "Scroll down"
    ).toString(),
    [KeymapId.scrollUp]: new KeymapItem(
        false,
        false,
        false,
        false,
        "k",
        "Scroll up"
    ).toString(),
    [KeymapId.selectLeft]: new KeymapItem(
        false,
        false,
        false,
        true,
        "h",
        "Select left"
    ).toString(),
    [KeymapId.selectRight]: new KeymapItem(
        false,
        false,
        false,
        true,
        "l",
        "Select Right"
    ).toString(),
    [KeymapId.refresh]: new KeymapItem(
        false,
        true,
        false,
        false,
        "r",
        "Refresh"
    ).toString(),
};
