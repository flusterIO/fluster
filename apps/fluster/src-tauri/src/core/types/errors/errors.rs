use serde::{Deserialize, Serialize};
use specta::Type;
use thiserror::Error;

#[derive(Debug, Error, Serialize, Deserialize, Type)]
pub enum FlusterError {
    // AI errors
    #[error("Fluster could not find any configured AI providers..")]
    NoAiProvidersConfigured,

    #[error("Fluster could not create a QR code you requested.")]
    FailToCreateQrCode,

    #[error("Fluster could not count the rows for a given predicate.")]
    FailToCount,

    #[error("This error is entirely on us. If you continue to encounter this error, please submit an issue on Github.")]
    NotImplemented,

    #[error("Fluster failed to copy some necessary files. You might experience unexpected behavior until this is resolved.")]
    FailToCopyFiles,

    #[error("Fluster could not write to the file system.")]
    FailToWriteFile,

    #[error("Fluster failed while attempting to save your settings.")]
    FailToSaveSettings,

    #[error("Fail to read settings from database.")]
    FailToReadSettings,
    // Bibliography Errors
    #[error("Fluster could not parse your bibliography file.")]
    FailToParseBibFile,

    #[error("Your specified bibliography path was not found.")]
    SettingsBibPathNotFound,

    #[error("Fluster could not successfully parse your bibliography file.")]
    CannotParseBibfile,

    // Database Errors
    #[error("Fluster couldn't find a valid data directory.")]
    FailToFindDataDirectory,

    #[error("Failed to serialize an entity.")]
    FailToSerialize,

    #[error("Found multiple entries with the same id.")]
    DuplicateId,

    #[error("Failed to delete an entity.")]
    FailToDelete,

    #[error("Failed to clean data. This may result in stale data in your database.")]
    FailToClean,

    #[error("Fluster failed to create a necessary table.")]
    FailToCreateTable,

    #[error("Flusted failed to open a database table.")]
    FailToOpenTable,

    #[error("Fluster failed to connect to your database.")]
    FailToConnect,

    #[error("Fluster failed to start the database server. This error may be harmless.")]
    FailToStartDb,

    #[error("Fluster failed to stop the database server as intended.")]
    FailToStopDb,

    #[error("Fluster failed to insert an item into your database.")]
    FailToCreateEntity,

    #[error("Fluster failed to insert a snippet into your database.")]
    FailToCreateSnippet,

    #[error("Fluster failed to find what it was looking for.")]
    FailToFind,

    #[error("Fluster failed to find something by a specific d. If you feel this is an issue with Fluster, please submit an issue on our github page.")]
    FailToFindById,

    #[error("We could not create the necessary paths. Unfortunately, we cannot continue.")]
    FailToCreatePath,

    #[error("We could not create a tag in your database. Make sure that everything is formatted correctly.")]
    FailToCreateTag,

    #[error("We could not create a subject in your database. Make sure that everything is formatted correctly.")]
    FailToCreateSubject,

    // File system errors
    //
    #[error("Could not find the data directory for your operating system. We cannot continue.")]
    DataDirNotFound(),

    #[error("Failed to clear the directory at {0}")]
    FailToClearDirectory(String),

    #[error("We could not create a topic in your database. Make sure that everything is formatted correctly.")]
    FailToCreateTopic,
    #[error("Fluster failed to locate a valid locate to store the necessary data. Please submit an issue on Github at {}", crate::core::types::constants::fluster_constants::GITHUB_ISSUE_PAGE_URL)]
    FailToLocateStorageDir,

    #[error("Failed to read file system path at {0}.")]
    FailToReadFileSystemPath(String),

    #[error("Fail to read mathjax font. Math may not render properly.")]
    FailToReadMathjaxFont,

    #[error("Failed to save file at {0}.")]
    FailToSaveFile(String),
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
