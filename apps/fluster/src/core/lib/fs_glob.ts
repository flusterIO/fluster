import store from "@/state/store";
import { commands } from "./bindings";
import { AppState } from "@/state/initial_state";
import { showToast } from "@fluster.io/dev";

export const fsFileExtensionGlob = async (
    fileExtensions: string
): Promise<string[]> => {
    const state: AppState = store.getState();
    if (!state.core.notesDirectory.length) {
        showToast({
            title: "Oh no",
            body: "Cannot get pdf's. You have not yet set your note's directory.",
            variant: "Error",
            duration: 5000,
        });
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
