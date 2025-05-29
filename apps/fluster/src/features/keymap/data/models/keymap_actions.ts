import store from "@/state/store";
import { KeymapId } from "./keymap_ids";
import { togglePanelBottom } from "#/panel_bottom/state/slice";
import { togglePanelRight } from "#/panel_right/state/slice";
import { togglePanelLeft } from "#/panel_left/state/slice";

export type GlobalKeymapActionId = Exclude<
    KeymapId,
    KeymapId.editorCommandPalette
>;

export const keymapActions: Record<GlobalKeymapActionId, () => Promise<void>> =
{
    [KeymapId.syncDirectory]: async () => { },
    [KeymapId.showCommandPalette]: async () => {
        window.dispatchEvent(
            new CustomEvent("show_command_palette", {
                detail: {},
            })
        );
        // store.dispatch(setCommandPaletteOpen(true));
    },
    [KeymapId.togglePanelBottom]: async () => {
        store.dispatch(togglePanelBottom());
    },
    [KeymapId.togglePanelLeft]: async () => {
        store.dispatch(togglePanelLeft());
    },
    [KeymapId.togglePanelRight]: async () => {
        store.dispatch(togglePanelRight());
    },
    [KeymapId.scrollUp]: async () => {
        console.log(`attempting to scroll`);
        document.scrollingElement?.scroll(0, -10);
        ///TODO: Get focused element and attemptp to scroll here.
    },
    [KeymapId.scrollDown]: async () => {
        document.scrollingElement?.scroll(0, 10);
        ///TODO: Get focused element and attemptp to scroll here.
    },
};
