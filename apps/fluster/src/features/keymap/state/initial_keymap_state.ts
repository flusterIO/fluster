import { KeymapId } from "../data/models/keymap_ids";
import { KeymapState } from "./keymap_state";

export const initialKeymapState: KeymapState = {
    [KeymapId.syncDirectory]: new KeymapItem(true, true, false, 66).toString(),
    [KeymapId.showCommandPalette]: new KeymapItem(
        false,
        true,
        false,
        80,
    ).toString(),
};
