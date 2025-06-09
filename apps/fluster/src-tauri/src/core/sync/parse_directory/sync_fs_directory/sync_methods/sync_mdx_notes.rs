use crate::core::sync::parse_directory::sync_fs_directory::models::sync_filesystem_options::SyncFilesystemDirectoryOptions;
use crate::core::types::errors::errors::FlusterError;
use crate::features::mdx::actions::save_mdx_note_groups::save_mdx_note_groups;
use crate::features::mdx::data::mdx_note_group::MdxNoteGroup;
use crossbeam_channel::unbounded;
use ignore::WalkBuilder;
use ignore::{DirEntry, WalkState};

pub async fn sync_mdx_filesystem_notes(
    opts: &SyncFilesystemDirectoryOptions,
) -> Result<(), FlusterError> {
    let (mdx_sender, mdx_receiver) = unbounded::<Result<MdxNoteGroup, FlusterError>>();
    WalkBuilder::new(opts.dir_path.clone())
        .threads(opts.n_threads as usize)
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
    let mut items: Vec<MdxNoteGroup> = Vec::new();
    for x in mdx_receiver.iter() {
        println!("X: {:?}", x);
        if let Ok(note) = x {
            items.push(note);
        } else {
            log::error!("Failed to create an MdxNoteGroup.")
        }
    }
    save_mdx_note_groups(items).await?;
    Ok(())
}
