import { EditKeymapSettingModalProps } from "@/events/window_events";

export const showEditKeymapModal = (data: EditKeymapSettingModalProps) => {
    window.dispatchEvent(
        new CustomEvent("show-edit-keymap-modal", {
            detail: data,
        })
    );
};
