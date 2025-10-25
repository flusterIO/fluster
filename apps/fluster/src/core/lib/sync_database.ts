import store from "@/state/store.ts";
import { commands } from "./bindings.ts";
import { showToast } from "#/toast_notification/data/events/show_toast.ts";
import { syncBib } from "#/bibliography/data/methods/sync_bib.ts";
import { AppState } from "@/state/initial_state.ts";
import { getExistingTaggables } from "./get_existing_taggables.ts";
import {
    DEFAULT_EMBEDDING_MODEL,
    DEFAULT_LANGUAGE_MODEL,
} from "#/ai/state/initial_ai_state.ts";
import { getRecentlyAccessedNotes } from "#/command_palette/data/tree/recently_accessed.ts";
import { parseDate } from "@fluster.io/dev";

// TODO: Move this to a Promises.all

export const sync = async (opts: {
    showSuccessToast?: boolean;
    with_ai: boolean;
}): Promise<boolean> => {
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
    if (state.ai.maxChunkLength <= state.ai.minChunkLength) {
        showToast({
            title: "Setting error",
            body: "Your max chunk size setting is less than your min chunk size setting. Cannot continue with syncing with AI. Continuing without AI",
            duration: 5000,
            variant: "Error",
        });
        opts.with_ai = false;
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
            ? "Fluster is synchronizing your database. Depending on your hardware, this may take some time while the AI related tasks run in the background. We'll send you another notification when the process is complete."
            : "Fluster is synchronizing your database without invoking AI related tasks.",
        duration: opts.with_ai ? 10000 : 5000,
        variant: "Info",
    });
    if (state.bib.bibPath) {
        try {
            const bibRes = await syncBib(state.bib.bibPath, state.bib.cslPath);
            if (bibRes.status === "error") {
                showToast({
                    title: "Error",
                    body: "Something went wrong while synchronizing your bibliography.",
                    duration: 5000,
                    variant: "Error",
                });
            }
        } catch (err) {
            console.log("Sync Bib Error: ", err);
        }
    }
    const existing_taggables = await getExistingTaggables();
    const recentlyAccessedNotes = await getRecentlyAccessedNotes();
    try {
        const res = await commands.syncLocalDatabase({
            dir_path: state.core.notesDirectory,
            bib_path: state.bib.bibPath,
            n_threads: (state.core.nThreads ?? 8).toString(),
            use_git_ignore: state.core.useGitIgnore,
            existing_taggables,
            ai: {
                with_ai: opts.with_ai,
                embedding_model: state.ai.embeddingModel ?? DEFAULT_EMBEDDING_MODEL,
                language_model: state.ai.defaultLanguageModel ?? DEFAULT_LANGUAGE_MODEL,
                max_text_split_tokens: 1000 as unknown as string,
            },
            recently_accessed_notes: recentlyAccessedNotes.map((recentNote) => {
                return {
                    last_read: parseDate(recentNote.mdx.last_read).valueOf().toString(),
                    file_path: recentNote.mdx.file_path,
                };
            }),
            ollama_port: state.ai.ollamaConnection.port ?? 11434,
            ollama_url: state.ai.ollamaConnection.url.length
                ? state.ai.ollamaConnection.url
                : "http://localhost",
            max_chunk_length: state.ai.maxChunkLength ?? 500,
            min_chunk_length: state.ai.minChunkLength ?? 200,
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
    } catch (err) {
        console.log("Sync Notes Error: ", err);
        return false;
    }
};
