import store from "@/state/store.ts";
import { commands } from "./bindings.ts";
import { showToast } from "#/toast_notification/data/events/show_toast.ts";
import { syncBib } from "#/bibliography/data/methods/sync_bib.ts";
import { AppState } from "@/state/initial_state.ts";

// TODO: Move this to a Promises.all

export const sync = async (): Promise<void> => {
  const state: AppState = store.getState();
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
  const res = await commands.syncLocalDatabase({
    dir_path: state.core.notesDirectory,
    bib_path: state.bib.bibPath,
    n_threads: (state.core.nThreads ?? 8).toString(),
    use_git_ignore: state.core.useGitIgnore,
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
