import store from "@/state/store.ts";
import { commands } from "./bindings.ts";
import { showToast } from "#/toast_notification/data/events/show_toast.ts";

export const sync = async (): Promise<void> => {
    const state = store.getState();
    const res = await commands.syncLocalDatabase({
        dir_path: state.core.notesDirectory,
        bib_path: state.bib.bib_path,
        n_threads: 8,
    });
    if (res.status === "ok") {
        showToast({
            title: "Success",
            body: "Your notes were successfully synced with your database",
            duration: 3000,
            variant: "Success",
        });
    } else {
        console.error(`An error occured while syncing your notes: `, res.error);
    }
};
