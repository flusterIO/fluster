use crate::core::database::db::get_database;
use crate::core::sync::parse_directory::sync_fs_directory::models::sync_filesystem_options::SyncFilesystemDirectoryOptions;
use crate::core::types::errors::errors::FlusterResult;
use crate::features::mdx::actions::save_mdx_note_groups::save_mdx_note_groups;
use crate::features::mdx::data::mdx_note_group::MdxNoteGroup;
use crossbeam_channel::unbounded;
use ignore::WalkBuilder;
use ignore::{DirEntry, WalkState};

#[allow(irrefutable_let_patterns)]
pub async fn sync_mdx_filesystem_notes(opts: &SyncFilesystemDirectoryOptions) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;

    let threads: usize = opts.n_threads.parse().unwrap();
    let (mdx_sender, mdx_receiver) = unbounded::<String>();
    WalkBuilder::new(opts.dir_path.clone())
        .threads(threads)
        .add_custom_ignore_filename(".flusterIgnore")
        .git_ignore(opts.use_git_ignore)
        .ignore(true)
        .build_parallel()
        .run(|| {
            let sender = mdx_sender.clone();
            Box::new(move |either_entry: Result<DirEntry, ignore::Error>| {
                if either_entry.is_ok() {
                    // This unecessary 'if let' statement was the only way I could resolve a
                    // type issue while off wifi and unable to look at the docs. Remove this
                    // when you have time and an internet connection.
                    if let path = either_entry.unwrap().path() {
                        if path.is_file() && path.extension() == Some("mdx".as_ref()) {
                            sender.send(path.to_str().unwrap().to_string()).unwrap();
                        }
                    }
                }
                WalkState::Continue
            })
        });

    drop(mdx_sender);
    let mut items: Vec<MdxNoteGroup> = Vec::new();
    for p in mdx_receiver.iter() {
        let note_group = MdxNoteGroup::from_file_system_path(&db, p).await?;
        println!("Note Group: {:#?}", note_group);
        items.push(note_group);
    }
    save_mdx_note_groups(&db, items).await?;
    Ok(())
}
