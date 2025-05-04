use crossbeam::thread;
use crossbeam_channel::unbounded;
use fluster_db::api::db::get_database;
use fluster_models::models::{
    bibliography::bib_file::BibtexFile, notes::mdx::mdx_note::MdxNoteEntity,
};
use fluster_types::errors::{any_error::AnyFlusterError, errors::FlusterError};
pub use fluster_types::traits::db_entity::FlusterDatabaseEntity;
use ignore::{DirEntry, WalkBuilder, WalkState};
use std::path;

use super::{
    models::sync_filesystem_options::SyncFilesystemDirectoryOptions,
    sync_methods::{
        sync_mdx_notes::sync_mdx_filesystem_notes, sync_user_bibliography::sync_user_bibliography,
    },
};

pub async fn sync_directory(
    opts: SyncFilesystemDirectoryOptions,
) -> Option<Vec<impl AnyFlusterError>> {
    let (mdx_note_sender, mdx_note_receiver) =
        unbounded::<Result<MdxNoteEntity, fluster_types::errors::parsing_errors::ParsingError>>();
    let (error_sender, error_receiver) = unbounded::<Box<dyn AnyFlusterError>>();
    let notes_path = path::Path::new(&opts.dir_path);
    let mut errors: Vec<FlusterError> = Vec::new();

    let database = get_database().await;

    if database.is_err() {
        errors.push(FlusterError::FailToConnect);
        return Some(errors);
    }

    let db = database.unwrap();

    /// Check if user provided bib path, and if so spawn a new thread and sync that bib.
    // let handle: Option<>
    let bib_thread_handle = std::thread::spawn(async || {
        if opts.bib_path.is_some() {
            sync_user_bibliography(opts.bib_path, error_sender, db).await;
        }
    });

    // This needs to go before joining threads, but after all of the thread initialization
    for err in error_receiver.iter() {
        errors.push(err);
    }

    // No need to thread here, as ignore is taking care of the threading.
    sync_mdx_filesystem_notes(&opts.dir_path, mdx_note_sender, error_sender).await;
    bib_thread_handle.join();

    // drop(sender);
    if !errors.is_empty() {
        Some(errors)
    } else {
        None
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn sync_returns_no_errors() {
        let f = sync_directory(SyncFilesystemDirectoryOptions {
            dir_path: "/Users/bigsexy/Desktop/notes/content/".to_owned(),
            bib_path: None,
        })
        .await;
        assert!(f.is_none_or(|x| x.is_empty()), "Is not none or empty.");
        // assert_eq!(result, 4);
    }
}
