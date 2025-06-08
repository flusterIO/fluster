import store from "@/state/store.ts";
import { commands } from "./bindings.ts";

export const sync = async (): Promise<void> => {
    const state = store.getState();
    const res = await commands.syncLocalDatabase({
        dir_path: state.core.notesDirectory,
        bib_path: state.bib.bib_path,
        n_threads: 8,
    });
    console.log("res: ", res);
};
