import { useEffect, useState } from "react";
import { useEventListener } from "./use_event_listener";

interface SetSyncronizedValueEvent {
    content_id: string;
    content: string;
    /// Set state even if state exists. This should be true whenever the change is due to user interaction, but this is necessary to avoid overwriting valid state with an empty string.
    override: boolean;
}
declare global {
    interface WindowEventMap {
        "set-synchronized-value": CustomEvent<SetSyncronizedValueEvent>;
    }
}

export const useSynchronizedValue = (
    unique_content_id: string,
    initialValue?: string
) => {
    const [value, setValue] = useState(initialValue ?? "");
    useEffect(() => {
        window.dispatchEvent(
            new CustomEvent("set-synchronized-value", {
                detail: {
                    content_id: unique_content_id,
                    content: value,
                },
            })
        );
    }, [value, unique_content_id]);

    useEventListener("set-synchronized-value", (e) => {
        if (e.detail.override || e.detail.content.length) {
            if (e.detail.content_id === unique_content_id) {
                setValue(e.detail.content);
            }
        }
    });
    return [value, setValue];
};
