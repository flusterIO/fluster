use serde::{Deserialize, Serialize};
use specta::Type;

use crate::features::taggables::commands::get_existing_taggables::AllTaggableData;

// This will need to be replaced with the client side constant as well.
pub const DEFAULT_LOCAL_EMBEDDING_MODEL: &str = "nomic-embed-text:latest";
pub const DEFAULT_LOCAL_LANGUAGE_MODEL: &str = "phi3:3.8b-instruct";

#[derive(Serialize, Deserialize, Type, Debug)]
pub struct AiSyncSettings {
    pub embedding_model: String,
    pub language_model: String,
    pub with_ai: bool,
    pub max_text_split_tokens: usize,
}

impl Default for AiSyncSettings {
    fn default() -> Self {
        Self {
            embedding_model: DEFAULT_LOCAL_EMBEDDING_MODEL.to_string(),
            language_model: DEFAULT_LOCAL_LANGUAGE_MODEL.to_string(),
            with_ai: false,
            max_text_split_tokens: 1000,
        }
    }
}

#[derive(Type, Serialize, Deserialize, Debug, Clone)]
pub struct RecentlyAccessedNoteData {
    pub last_read: String,
    pub file_path: String,
}

#[derive(Type, Serialize, Deserialize, Debug)]
pub struct SyncFilesystemDirectoryOptions {
    /// The path to the user's note's directory
    pub dir_path: String,
    pub bib_path: Option<String>,
    /// The stringified integer representing the number of threads.
    pub n_threads: String,
    pub use_git_ignore: bool,
    /// defaults to true
    pub existing_taggables: AllTaggableData,
    /// Embeddings model to be used when syncing.
    pub ai: AiSyncSettings,
    pub recently_accessed_notes: Vec<RecentlyAccessedNoteData>,
    pub ollama_url: String,
    pub ollama_port: u16,
    pub min_chunk_length: usize,
    pub max_chunk_length: usize,
}

impl Default for SyncFilesystemDirectoryOptions {
    fn default() -> Self {
        Self {
            dir_path: Default::default(),
            bib_path: Default::default(),
            n_threads: "16".to_string(),
            use_git_ignore: false,
            ai: AiSyncSettings::default(),
            existing_taggables: AllTaggableData {
                tags: Vec::new(),
                topics: Vec::new(),
                subjects: Vec::new(),
            },
            recently_accessed_notes: Vec::new(),
            ollama_url: "http://localhost".to_string(),
            ollama_port: 11434,
            min_chunk_length: 200,
            max_chunk_length: 500,
        }
    }
}
