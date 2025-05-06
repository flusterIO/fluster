pub struct SyncFilesystemDirectoryOptions {
    pub dir_path: String,
    pub bib_path: Option<String>,
    pub n_threads: u32,
}

impl Default for SyncFilesystemDirectoryOptions {
    fn default() -> Self {
        Self {
            dir_path: Default::default(),
            bib_path: Default::default(),
            n_threads: 32,
        }
    }
}
