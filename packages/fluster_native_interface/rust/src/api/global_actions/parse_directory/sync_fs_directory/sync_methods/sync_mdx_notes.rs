use crate::api::actions::mdx_note::create_many::create_many_mdx_notes;
use crate::api::models::mdx_note_group::mdx_note_group::MdxNoteGroup;
use crate::api::models::taggable::taggable_model::Taggable;
use crossbeam_channel::unbounded;
use crossbeam_channel::Sender;
use fluster_db::entities::mdx_note::mdx_note_creatable::MdxNoteCreatable;
use fluster_types::errors::errors::FlusterError;
use fluster_types::FlusterDb;
use flutter_rust_bridge::frb;
use ignore::WalkBuilder;
use ignore::{DirEntry, WalkState};

#[frb(opaque)]
pub async fn sync_mdx_filesystem_notes(
    notes_path: &str,
    error_sender: &Sender<FlusterError>,
    c: &mut FlusterDb,
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
    let mut mdx_notes: Vec<MdxNoteCreatable> = Vec::new();
    let mut tags: Vec<Taggable> = Vec::new();
    for x in mdx_receiver.iter() {
        if let Ok(mut note) = x {
            mdx_notes.push(note.mdx);
            tags.append(&mut note.tags);
        } else {
            error_sender.send(FlusterError::FailToCreateEntity).unwrap();
        }
    }
    create_many_mdx_notes(c, mdx_notes);
    Ok(())
}
