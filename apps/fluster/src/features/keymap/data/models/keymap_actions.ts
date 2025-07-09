import store from "@/state/store";
import { KeymapId } from "./keymap_ids";
import { togglePanelBottom } from "#/panel_bottom/state/slice";
import { togglePanelRight } from "#/panel_right/state/slice";
import { togglePanelLeft } from "#/panel_left/state/slice";
import { sync } from "@/lib/sync_database";
import { getScrollTarget } from "#/keymap/utils/get_scroll_target";

export type GlobalKeymapActionId = Exclude<
    KeymapId,
    KeymapId.editorCommandPalette | KeymapId.selectLeft | KeymapId.selectRight
>;

export const keymapActions: Record<GlobalKeymapActionId, () => Promise<void>> =
{
    [KeymapId.syncDirectory]: async () => {
        await sync({
            with_ai: false,
            showSuccessToast: true,
        });
    },
    [KeymapId.showCommandPalette]: async () => {
        window.dispatchEvent(
            new CustomEvent("show_command_palette", {
                detail: {},
            })
        );
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
        const target = getScrollTarget();
        target?.scrollBy({
            top:
                -(target
                    ? target.getBoundingClientRect().height
                    : window.innerHeight) / 3,
            behavior: "smooth",
        });
    },
    [KeymapId.scrollDown]: async () => {
        const target = getScrollTarget();
        target?.scrollBy({
            top:
                (target
                    ? target.getBoundingClientRect().height
                    : window.innerHeight) / 3,
            behavior: "smooth",
        });
    },
    [KeymapId.refresh]: async () => {
        window.location.reload();
    },
};
