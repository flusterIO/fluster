import store from "@/state/store";
import { KeymapId } from "./keymap_ids";
import { setCommandPaletteOpen } from "#/command_palette/state/slice";
import { showToast } from "#/toast_notification/state/slice";
import { ToastVariant } from "#/toast_notification/state/toast_state";

export const keymapActions: Record<KeymapId, () => Promise<void>> = {
  [KeymapId.syncDirectory]: async () => {},
  [KeymapId.showCommandPalette]: async () => {
    store.dispatch(
      showToast({
        expires: 5000,
        title: "Toast here",
        desc: "Description goes here",
        variant: ToastVariant.info,
      }),
    );
    store.dispatch(setCommandPaletteOpen(true));
  },
};
