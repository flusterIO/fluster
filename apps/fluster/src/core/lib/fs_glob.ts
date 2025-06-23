import store from "@/state/store";
import { commands } from "./bindings";
import { AppState } from "@/state/initial_state";

export const fsFileExtensionGlob = async (
    fileExtensions: string
): Promise<string[]> => {
    const state: AppState = store.getState();
    if (!state.core.notesDirectory.length) {
        console.warn(
            `Cannot get pdf's. You have not yet set your note's directory.`
        );
        return [];
    }
    const res = await commands.fsFileExtensionGlob(
        fileExtensions,
        state.core.notesDirectory,
        state.core.nThreads?.toString()
    );
    if (res.status === "ok") {
        return res.data;
    } else {
        console.error(
            "An error occurred while performing a glob search: ",
            res.error
        );
        return [];
    }
};
