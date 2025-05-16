import store from "@/state/store";
import { KeymapId } from "./keymap_ids";
import { setCommandPaletteOpen } from "#/command_palette/state/slice";

export const keymapActions: Record<KeymapId, () => Promise<void>> = {
    [KeymapId.syncDirectory]: async () => { },
    [KeymapId.showCommandPalette]: async () => {
        store.dispatch(setCommandPaletteOpen(true));
    },
};
