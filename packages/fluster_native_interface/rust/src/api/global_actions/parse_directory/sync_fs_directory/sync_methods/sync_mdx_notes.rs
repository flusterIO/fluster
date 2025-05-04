use crossbeam_channel::Sender;
use fluster_models::models::notes::mdx::mdx_note::MdxNoteEntity;
use fluster_types::errors::errors::FlusterError;
use ignore::WalkBuilder;
use ignore::{DirEntry, WalkBuilder, WalkState};

pub async fn sync_mdx_filesystem_notes(
    notes_path: &str,
    mdx_sender: Sender<Result<MdxNoteEntity, FlusterError>>,
    error_sender: Sender<FlusterError>,
) {
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
                        let note = MdxNoteEntity::from_file_system_path(path.to_str().unwrap());
                        sender.send(note).unwrap();
                    }
                }
                WalkState::Continue
            })
        });

    drop(mdx_sender);
    for x in receiver.iter() {
        if let Ok(note) = x {
            let save_res = note.save(db).await;
            if let Some(save_res_error) = save_res {
                error_sender.send(save_res_error).unwrap();
            }
        } else {
            error_sender.send(FlusterError::FailToCreateEntity).unwrap();
        }
    }
}
