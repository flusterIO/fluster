import store from "@/state/store";
import { SyncAiArgs } from "../data/types/ai";
import { AppState } from "@/state/initial_state";
import { commands } from "@/lib/bindings";
import { showToast } from "@fluster.io/dev";


export const getSyncAiArgs = async (): Promise<SyncAiArgs | undefined> => {
    const state: AppState = store.getState();
    const databaseDirectory = await commands.getDatabasePath();
    if (databaseDirectory.status === "error") {
        showToast({
            title: "Something went wrong",
            body: "Cannot continue with syncing because we could not locate your database",
            duration: 5000,
            variant: "Error"
        })
        return
    }
    const parsableFiles = await commands.getParsableFiles({
        dir_path: state.core.notesDirectory,
        n_threads: (state.core.nThreads ?? 8).toString(),
        use_git_ignore: state.core.useGitIgnore,
    })

    if (parsableFiles.status === "error") {
        showToast({
            title: "Something went wrong",
            body: "Cannot continue with syncing because we could not gather the necessary files.",
            duration: 5000,
            variant: "Error"
        })
        return
    }
    const embeddedDocsRes = await commands.getAllEmbeddedDocs();
    if (embeddedDocsRes.status === "error") {
        console.error(`Could not load embedded docs.`)
    }
    return {
        // TODO: Add something to the settings page to toggle override_default_sync_settings dynamically.
        override_default_sync_settings: true,
        model: state.ai.embeddingModel,
        notes_directory: state.core.notesDirectory,
        database_directory: databaseDirectory.data,
        ollama_url_override: state.ai.ollamaConnection.useOllamaConnectionData ? `${state.ai.ollamaConnection.url}:${state.ai.ollamaConnection.port}` : undefined,
        temperature: state.ai.defaultTemperature,
        top_k: state.ai.defaultTopK,
        top_p: state.ai.defaultTopP,
        mdx_files: parsableFiles.data.mdx_files,
        embedded_docs: embeddedDocsRes.data
    }
}
