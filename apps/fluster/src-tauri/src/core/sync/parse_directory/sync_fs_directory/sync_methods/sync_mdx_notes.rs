use crate::core::types::errors::errors::FlusterError;
use crate::features::mdx::actions::save_mdx_note_groups::save_mdx_note_groups;
use crate::features::mdx::data::mdx_note_group::MdxNoteGroup;
use crossbeam_channel::unbounded;
use ignore::WalkBuilder;
use ignore::{DirEntry, WalkState};

pub async fn sync_mdx_filesystem_notes(notes_path: &str) -> Result<(), FlusterError> {
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
            log::error!("Failed to create an MdxNoteGroup.")
        }
    }
    save_mdx_note_groups(items).await?;
    Ok(())
}
