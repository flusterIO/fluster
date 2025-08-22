use std::ffi::OsStr;

use crate::core::database::db::get_database;
use crate::core::models::taggable::shared_taggable_model::SharedTaggableModel;
use crate::core::sync::parse_directory::sync_fs_directory::models::sync_filesystem_options::SyncFilesystemDirectoryOptions;
use crate::core::types::errors::errors::FlusterResult;
use crate::features::ai::data::ai_providers::local_ai_provider::LocalAiClient;
use crate::features::mdx::actions::save_mdx_note_groups::save_mdx_note_groups;
use crate::features::mdx::data::mdx_note_entity::MdxNoteEntity;
use crate::features::mdx::data::mdx_note_group::MdxNoteGroup;
use crate::features::search::types::PaginationProps;
use crate::features::settings::data::auto_setting_entity::AutoSettingEntity;
use crate::features::settings::data::auto_setting_model::AutoSettingType;
use chrono::Utc;
use crossbeam_channel::unbounded;
use ignore::WalkBuilder;
use ignore::{DirEntry, WalkState};

#[allow(irrefutable_let_patterns)]
pub async fn sync_mdx_filesystem_notes(opts: &SyncFilesystemDirectoryOptions) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;

    let existing_notes = MdxNoteEntity::get_all(&db).await?;
    let auto_settings = AutoSettingEntity::get_many(
        &db,
        &None,
        &PaginationProps {
            per_page: 99999,
            page_number: 1,
        },
    )
    .await?;

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
                        let path_extension = path.extension().unwrap_or("--".as_ref());
                        let fps: Vec<&OsStr> = vec!["md".as_ref(), "mdx".as_ref()];
                        let is_file_type = fps.contains(&path_extension);
                        if path.is_file() && is_file_type {
                            sender.send(path.to_str().unwrap().to_string()).unwrap();
                        }
                    }
                }
                WalkState::Continue
            })
        });

    drop(mdx_sender);
    // let (note_group_sender, note_group_receiver) = unbounded::<String>();
    let mut items: Vec<MdxNoteGroup> = Vec::new();
    let notes_dir_path = std::path::Path::new(&opts.dir_path);
    for p in mdx_receiver.iter() {
        let existing_note = existing_notes.iter().find(|x| x.file_path == p);
        let mut note_group = MdxNoteGroup::from_file_system_path(&db, p, existing_note).await?;
        // -- Apply auto-settings before inserting into array.
        if !note_group.mdx.file_path.is_empty() {
            for auto_setting in &auto_settings {
                if let Some(glob_path) = notes_dir_path.join(auto_setting.glob.clone()).to_str() {
                    let is_match = glob_match::glob_match(glob_path, &note_group.mdx.file_path);
                    if is_match {
                        match auto_setting.setting_type {
                            AutoSettingType::Tag => {
                                let lowercase_value = auto_setting.value.to_lowercase();
                                let exists = note_group
                                    .tags
                                    .iter()
                                    .any(|x| x.value.to_lowercase() == lowercase_value);
                                if !exists {
                                    note_group.tags.push(SharedTaggableModel {
                                        value: auto_setting.value.clone(),
                                        ctime: Utc::now().timestamp_millis().to_string(),
                                    })
                                }
                            }
                            AutoSettingType::Topic => {
                                if note_group.front_matter.topic.is_none() {
                                    note_group.front_matter.topic = Some(SharedTaggableModel {
                                        value: auto_setting.value.clone(),
                                        ctime: Utc::now().timestamp_millis().to_string(),
                                    });
                                }
                            }
                            AutoSettingType::Subject => {
                                if note_group.front_matter.subject.is_none() {
                                    note_group.front_matter.subject = Some(SharedTaggableModel {
                                        value: auto_setting.value.clone(),
                                        ctime: Utc::now().timestamp_millis().to_string(),
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }
        items.push(note_group);
    }

    LocalAiClient {}
        .get_text_embeddings(&mut items, opts)
        .await?;
    save_mdx_note_groups(&db, items, opts.existing_taggables.clone()).await?;
    Ok(())
}
