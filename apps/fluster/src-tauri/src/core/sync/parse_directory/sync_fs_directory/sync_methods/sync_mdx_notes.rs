use crate::core::models::mdx_note_group::mdx_note_group::MdxNoteGroup;
use crate::core::types::errors::errors::FlusterError;
use crate::core::types::FlusterDb;
use crossbeam_channel::unbounded;
use crossbeam_channel::Sender;
use ignore::WalkBuilder;
use ignore::{DirEntry, WalkState};

pub async fn sync_mdx_filesystem_notes(
    notes_path: &str,
    error_sender: &Sender<FlusterError>,
    db: &mut FlusterDb<'_>,
) -> Result<(), FlusterError> {
    let (mdx_sender, mdx_receiver) = unbounded::<Result<MdxNoteGroup, FlusterError>>();
    // let mut c = get_database_connection()
    //     .await
    //     .or_else(|_| Err(FlusterError::FailToConnect))?;
    WalkBuilder::new(notes_path)
        .threads(32)
        .add_custom_ignore_filename(".flusterIgnore")
        .ignore(true)
        .build_parallel()
        .run(|| {
            let sender = mdx_sender.clone();
            Box::new(move |either_entry: Result<DirEntry, ignore::Error>| {
                if either_entry.is_ok() {
                    let entry = either_entry.unwrap();
                    let path = entry.path();
                    if path.is_file() && path.extension() == Some("mdx".as_ref()) {
                        let note_group =
                            MdxNoteGroup::from_file_system_path(path.to_str().unwrap().to_string());
                        sender.send(note_group).unwrap();
                    }
                }
                WalkState::Continue
            })
        });

    drop(mdx_sender);
    // let mut items: Vec<BTreeMap<&'static str, BTreeMap<&'static str, Value>>> = Vec::new();
    let mut items: Vec<MdxNoteGroup> = Vec::new();
    for x in mdx_receiver.iter() {
        if let Ok(note) = x {
            // let b = note.to_upsert_args();
            // items.push(b);
            items.push(note);
        } else {
            error_sender.send(FlusterError::FailToCreateEntity).unwrap();
        }
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use crate::core::db::db::get_database;

    use super::*;

    // #[tokio::test]
    // async fn mdx_note_serializes_to_sql() {
    //     // let p = fluster_test_utils::test_utils::get_test_mdx_path();
    //     let db = fluster_test_utils::test_utils::get_memory_database().await;
    //     let (error_sender, error_receiver) = unbounded::<FlusterError>();
    //     let res =
    //         sync_mdx_filesystem_notes("/Users/bigsexy/Desktop/notes/", &error_sender, &db).await;
    //     assert!(
    //         res.is_ok(),
    //         "Parses notes directory without throwing an error."
    //     );

    //     // assert_eq!(result, 4);
    // }
}
