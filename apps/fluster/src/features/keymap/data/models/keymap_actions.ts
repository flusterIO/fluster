import store from "@/state/store";
import { KeymapId } from "./keymap_ids";
import { togglePanelBottom } from "#/panel_bottom/state/slice";
import { togglePanelRight } from "#/panel_right/state/slice";
import { togglePanelLeft } from "#/panel_left/state/slice";

export type GlobalKeymapActionId = Exclude<
    KeymapId,
    KeymapId.editorCommandPalette | KeymapId.selectLeft | KeymapId.selectRight
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
        document.getElementById("scroll-target")?.scrollBy({
            top: -window.innerHeight / 3,
            behavior: "smooth",
        });
    },
    [KeymapId.scrollDown]: async () => {
        document.getElementById("scroll-target")?.scrollBy({
            top: window.innerHeight / 3,
            behavior: "smooth",
        });
    },
    [KeymapId.refresh]: async () => {
        window.location.reload();
    },
};
