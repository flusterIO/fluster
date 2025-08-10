use serde::{Deserialize, Serialize};
use specta::Type;

use crate::features::taggables::commands::get_existing_taggables::AllTaggableData;

#[derive(Type, Serialize, Deserialize, Debug)]
pub struct SyncFilesystemDirectoryOptions {
    pub dir_path: String,
    pub bib_path: Option<String>,
    /// The stringified integer representing the number of threads.
    pub n_threads: String,
    pub use_git_ignore: bool,
    /// defaults to true
    pub with_ai: bool,
    pub existing_taggables: AllTaggableData,
    /// Embeddings model to be used when syncing.
    pub embedding_model: Option<String>,
}

impl Default for SyncFilesystemDirectoryOptions {
    fn default() -> Self {
        Self {
            dir_path: Default::default(),
            bib_path: Default::default(),
            n_threads: "16".to_string(),
            use_git_ignore: false,
            with_ai: true,
            embedding_model: None,
            existing_taggables: AllTaggableData {
                tags: Vec::new(),
                topics: Vec::new(),
                subjects: Vec::new(),
            },
        }
    }
}
