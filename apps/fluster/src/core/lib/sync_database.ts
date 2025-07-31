import store from "@/state/store.ts";
import { commands, SyncFilesystemDirectoryOptions } from "./bindings.ts";
import { showToast } from "#/toast_notification/data/events/show_toast.ts";
import { syncBib } from "#/bibliography/data/methods/sync_bib.ts";
import { AppState } from "@/state/initial_state.ts";

// TODO: Move this to a Promises.all

export const sync = async (
    opts: Omit<
        SyncFilesystemDirectoryOptions,
        "dir_path" | "bib_path" | "n_threads" | "use_git_ignore"
    > & {
        showSuccessToast?: boolean;
    }
): Promise<boolean> => {
    const state: AppState = store.getState();
    if (!state.core.notesDirectory.trim().length) {
        showToast({
            title: "No directory set",
            body: "You must set your notes directory on the settings page before syncng your database.",
            duration: 10000,
            variant: "Error",
        });
        return false;
    }
    const dirExists = await commands.pathExists(state.core.notesDirectory);
    if (!dirExists) {
        showToast({
            title: "Directory does not exist.",
            body: `We cannot find the directory you set: ${state.core.notesDirectory}`,
            duration: 10000,
            variant: "Error",
        });
        return false;
    }
    showToast({
        title: "Syncing...",
        body: opts.with_ai
            ? "Fluster is synchronizing your database. Depending on your hardware, this may take some time while the AI related tasks run in the background. We'll send you another notification when the syncing is complete."
            : "Fluster is synchronizing your database without invoking AI related tasks.",
        duration: opts.with_ai ? 10000 : 5000,
        variant: "Info",
    });
    if (state.bib.bibPath) {
        const res = await syncBib(state.bib.bibPath, state.bib.cslPath);
        if (res.status === "error") {
            showToast({
                title: "Error",
                body: "Something went wrong while synchronizing your bibliography.",
                duration: 5000,
                variant: "Error",
            });
        }
    }
    console.log(`Here...`);
    const res = await commands.syncLocalDatabase({
        dir_path: state.core.notesDirectory,
        bib_path: state.bib.bibPath,
        n_threads: (state.core.nThreads ?? 8).toString(),
        use_git_ignore: state.core.useGitIgnore,
        ...opts,
    });
    console.log("res: ", res);
    if (res.status === "ok") {
        if (opts.showSuccessToast) {
            showToast({
                title: "Success",
                body: "Your notes were successfully synced with your database",
                duration: 3000,
                variant: "Success",
            });
        }
        window.dispatchEvent(new CustomEvent("database-sync-success", {}));
        return true;
    } else {
        console.error(`An error occured while syncing your notes: `, res.error);
        return false;
    }
    return true;
};
