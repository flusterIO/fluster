use serde::{Deserialize, Serialize};
use specta::Type;
use thiserror::Error;

#[derive(Debug, Error, Serialize, Deserialize, Type)]
pub enum FlusterError {
    // Bibliography Errors
    #[error("Your specified bibliography path was not found.")]
    SettingsBibPathNotFound,

    #[error("Fluster could not successfully parse your bibliography file.")]
    CannotParseBibfile,

    // Database Errors
    #[error("Fluster failed to connect to your database.")]
    FailToConnect,

    #[error("Fluster failed to insert an item into your database.")]
    FailToCreateEntity,

    #[error("Fluster failed to find what it was looking for.")]
    FailToFind,

    #[error("Fluster failed to find something by a specific d. If you feel this is an issue with Fluster, please submit an issue on our github page.")]
    FailToFindById,

    // File system errors
    //
    #[error("Could not find the data directory for your operating system. We cannot continue.")]
    DataDirNotFound(),

    #[error("We could not create the necessary paths. Unfortunately, we cannot continue.")]
    FailToCreatePath,

    #[error("Fluster failed to locate a valid locate to store the necessary data. Please submit an issue on Github at {}", crate::core::types::constants::fluster_constants::GITHUB_ISSUE_PAGE_URL)]
    FailToLocateStorageDir,

    #[error("Failed to read file system path at {0}.")]
    FailToReadFileSystemPath(String),
    // Parsing Errors
    #[error("Failed to parse the mdx content at `{0}`.")]
    MdxParsingError(String),
    #[error("Fluster was unable to find a title for the note at `{0}`.")]
    NoTitleError(String),

    #[error("Failed to find the note at `{0}`.")]
    AttemptedToParseFileWasntFound(String),

    // Mdx Note
    #[error("We could not save the mdx file{0}. If this occurs to many files at once it is likely an issue on our end. If that is the case, please submit an issue on Github so it can be fixed ASAP.")]
    FailToSaveMdxNote(String),

    /// Taggables
    ///
    #[error(
        "We couldn't save some tags. If this occurs frequently, please file an issue on Github."
    )]
    FailToUpsertTags,
}

pub type FlusterResult<T> = Result<T, FlusterError>;

// impl flutter_rust_bridge::
