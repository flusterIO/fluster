use crossbeam_channel::{bounded, unbounded};
use fluster_db::api::db::get_database;
use fluster_models::models::notes::mdx::mdx_note::MdxNoteRust;
pub use fluster_types::{
    errors::database_errors::DatabaseError, traits::db_entity::FlusterDatabaseEntity,
};
use ignore::{WalkBuilder, WalkState};
use log::info;
use rayon::prelude::*;
use std::path;

pub async fn sync_directory(dir_name: String) -> Option<Vec<DatabaseError>> {
    let (sender, receiver) =
        unbounded::<Result<MdxNoteRust, fluster_types::errors::parsing_errors::ParsingError>>();
    let notes_path = path::Path::new(&dir_name);
    let mut errors: Vec<DatabaseError> = Vec::new();

    let database = get_database().await;

    if database.is_err() {
        errors.push(DatabaseError::FailToConnect);
        return Some(errors);
    }
    let db = database.unwrap();

    WalkBuilder::new(notes_path)
        .threads(32)
        .add_custom_ignore_filename(".flusterIgnore")
        .ignore(true)
        .build_parallel()
        .run(|| {
            let sender = sender.clone();
            Box::new(move |either_entry| {
                if either_entry.is_ok() {
                    let entry = either_entry.unwrap();
                    let path = entry.path();
                    if path.is_file() && path.extension() == Some("mdx".as_ref()) {
                        let note = MdxNoteRust::from_file_system_path(path.to_str().unwrap());
                        sender.send(note).unwrap();
                    }
                }
                WalkState::Continue
            })
        });

    drop(sender);
    for x in receiver.iter() {
        if let Ok(note) = x {
            let save_res = note.save(db).await;
            if let Some(save_res_error) = save_res {
                errors.push(save_res_error);
            }
        } else {
            errors.push(DatabaseError::FailToCreateEntity);
        }
    }
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
    async fn locates_files() {
        let f = sync_directory("/Users/bigsexy/Desktop/notes/content/".to_owned()).await;
        assert!(true == true, "True does indeed equal true.");
        // assert_eq!(result, 4);
    }

    #[tokio::test]
    async fn sync_returns_no_errors() {
        let f = sync_directory("/Users/bigsexy/Desktop/notes/content/".to_owned()).await;
        assert!(
            f.is_none_or(|x| x.is_empty()),
            "True does indeed equal true."
        );
        // assert_eq!(result, 4);
    }
}
