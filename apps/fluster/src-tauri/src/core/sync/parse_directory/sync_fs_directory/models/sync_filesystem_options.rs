use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Type, Serialize, Deserialize, Debug)]
pub struct SyncFilesystemDirectoryOptions {
    pub dir_path: String,
    pub bib_path: Option<String>,
    /// The stringified integer representing the number of threads.
    pub n_threads: String,
    pub use_git_ignore: bool,
    /// defaults to true
    pub with_ai: bool,
}

impl Default for SyncFilesystemDirectoryOptions {
    fn default() -> Self {
        Self {
            dir_path: Default::default(),
            bib_path: Default::default(),
            n_threads: "8".to_string(),
            use_git_ignore: false,
            with_ai: true,
        }
    }
}
