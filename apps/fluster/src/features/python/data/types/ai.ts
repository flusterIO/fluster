export interface ModelTemperatureArgs {
    temperature: number,
    /** top_k: Integer */
    top_k: number,
    /** top_p: Float */
    top_p: number
}


export interface OllamaTemperatureArgs extends ModelTemperatureArgs {
    ollama_url_override: string
}
