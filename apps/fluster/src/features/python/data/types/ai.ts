import { EmbeddedDocFile } from "@/lib/bindngs";

export interface ModelTemperatureArgs {
    model: string,
    temperature: number,
    /** top_k: Integer */
    top_k: number,
    /** top_p: Float */
    top_p: number
}


export interface OllamaTemperatureArgs extends ModelTemperatureArgs {
    ollama_url_override?: string
}


export interface SyncAiArgs extends OllamaTemperatureArgs {
    notes_directory: string,
    embedded_docs: EmbeddedDocFile[]
    database_directory: string,
    mdx_files: string[]
    override_default_sync_settings: boolean
}
