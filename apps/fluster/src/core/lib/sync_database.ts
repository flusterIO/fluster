import { showToast } from "#/toast_notification/data/events/show_toast.ts";
import { commands, FlusterError } from "./bindings.ts";
import { Channel } from "@tauri-apps/api/core";

// FIX: Replace these imports when bindings can be generated.
export const syncDatabase = async (): Promise<void> => {
    const onError = new Channel<FlusterError>();
    onError.onmessage = (e) => {
        console.log("error: ", e);
    };
    const res = await commands.syncLocalDatabase(
        {
            dir_path: "/Users/bigsexy/notes",
            bib_path: "citations.bib",
            n_threads: 8,
        },
        onError
    );
    showToast({
        title: "res",
        body: onError.toJSON(),
        duration: 1000000,
        variant: "Info",
    });
};
