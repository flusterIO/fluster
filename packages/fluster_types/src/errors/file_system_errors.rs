use thiserror::Error;

#[derive(Debug, Error)]
pub enum FileSystemError {
    #[error("Could not find the data directory for your operating system. We cannot continue.")]
    DataDirNotFound(),
    #[error("We could not create the necessary paths. Unfortunately, we cannot continue.")]
    FailToCreatePath,
}
