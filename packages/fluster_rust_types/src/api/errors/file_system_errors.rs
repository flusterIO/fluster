use thiserror::Error;

#[derive(Debug, Error)]
pub enum FileSystemError {
    #[error("Could not find the data directory for your operating system. We cannot continue.")]
    DataDirNotFound(),
}
