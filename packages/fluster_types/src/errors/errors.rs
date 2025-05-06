use serde::{Deserialize, Serialize};
use thiserror::Error;

#[derive(Debug, Error, Serialize, Deserialize)]
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

    #[error("Fluster failed to locate a valid locate to store the necessary data. Please submit an issue on Github at {}", crate::constants::fluster_constants::GITHUB_ISSUE_PAGE_URL)]
    FailToLocateStorageDir,

    // Parsing Errors
    #[error("Failed to parse the mdx content at `{0}`.")]
    MdxParsingError(String),
    #[error("Fluster was unable to find a title for the note at `{0}`.")]
    NoTitleError(String),

    #[error("Failed to find the note at `{0}`.")]
    AttemptedToParseFileWasntFound(String),
}
