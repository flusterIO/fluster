use std::str::FromStr;

use arrow_schema::SchemaRef;
use chrono::{DateTime, FixedOffset, Utc};

use crate::{
    core::{
        database::tables::table_paths::DatabaseTables,
        models::taggable::{
            shared_taggable_model::{SharedTaggableModel, SharedTaggableModelWithExists},
            subject_entity::SubjectEntity,
            tag_entity::TagEntity,
            topic_entity::TopicEntity,
        },
        sync::parse_directory::sync_fs_directory::sync_methods::clean::clean_database,
        types::{
            errors::errors::{FlusterError, FlusterResult},
            traits::db_entity::DbEntity,
            FlusterDb,
        },
    },
    features::{
        dictionary::{
            dictionary_entry_entity::DictionaryEntryEntity,
            dictionary_entry_model::DictionaryEntryModel,
        },
        math::data::equation_model::EquationModel,
        mdx::data::{
            front_matter_entity::FrontMatterEntity, front_matter_model::FrontMatterModel,
            mdx_note_bib_entry_entity::MdxNoteBibEntryEntity,
            mdx_note_bib_entry_model::MdxNoteBibEntryModel,
            mdx_note_dictionary_entry_entity::MdxNoteDictionaryEntryEntity,
            mdx_note_dictionary_entry_model::MdxNoteDictionaryEntryModel,
            mdx_note_entity::MdxNoteEntity, mdx_note_equation_entity::MdxNoteEquationEntity,
            mdx_note_equation_model::MdxNoteEquationModel, mdx_note_group::MdxNoteGroup,
            mdx_note_link_entity::MdxNoteLinkEntity, mdx_note_link_model::MdxNoteLinkModel,
            mdx_note_model::MdxNoteModel, mdx_note_subject_entity::MdxNoteSubjectEntity,
            mdx_note_subject_model::MdxNoteSubjectModel, mdx_note_tag_entity::MdxNoteTagEntity,
            mdx_note_tag_model::MdxNoteTagModel, mdx_note_topic_entity::MdxNoteTopicEntity,
            mdx_note_topic_model::MdxNoteTopicModel,
        },
        taggables::commands::get_existing_taggables::AllTaggableData,
    },
};

fn taggable_vec_exists(
    t: &[SharedTaggableModelWithExists],
    new_taggable: &SharedTaggableModel,
) -> bool {
    for k in t {
        if k.value == new_taggable.value {
            return true;
        }
    }
    false
}

// FIXME: Come back here and handle reformatting of the date here.
fn reformat_date(d: &str) -> String {
    let format = "%Y-%m-%dT%H:%M:%S";
    let datetime: Result<DateTime<FixedOffset>, chrono::ParseError> =
        chrono::DateTime::parse_from_str(d, format);
    println!("Datetime: {:?}", datetime);
    if let Ok(res) = chrono::DateTime::<Utc>::from_str(d) {
        return res.timestamp_millis().to_string();
    }
    let parsed_time_stamp: Result<i64, _> = d.parse();
    if parsed_time_stamp.is_ok() {
        return format!("{}", parsed_time_stamp.unwrap());
    }
    "0".to_string()
}

pub async fn re_establish_table(
    db: &FlusterDb<'_>,
    schema: SchemaRef,
    table: DatabaseTables,
) -> FlusterResult<()> {
    let _ = db.drop_table(table.to_string()).await;
    db.create_empty_table(table.to_string(), schema)
        .mode(lancedb::database::CreateTableMode::Create)
        .execute()
        .await
        .map_err(|_| FlusterError::FailToCreateTable)?;
    Ok(())
}

pub async fn save_mdx_note_groups(
    db: &FlusterDb<'_>,
    groups: Vec<MdxNoteGroup>,
    existing_taggables: AllTaggableData,
) -> FlusterResult<()> {
    // Clean all tables that can be regenerated from the file system.
    clean_database(db).await?;
    // Drop all tables with vectors so they can be re-established with the vector dimensions for
    // the currently selected model.
    re_establish_table(db, MdxNoteEntity::arrow_schema(), DatabaseTables::MdxNote).await?;
    // Loop over each item and generate the proper joining tables.
    let mut equations: Vec<EquationModel> = Vec::new();
    let mut tags: Vec<SharedTaggableModelWithExists> = existing_taggables
        .tags
        .iter()
        .map(|x| SharedTaggableModelWithExists {
            value: x.value.clone(),
            utime: reformat_date(&x.utime),
            exists: true,
        })
        .collect();
    let mut subjects: Vec<SharedTaggableModelWithExists> = existing_taggables
        .subjects
        .iter()
        .map(|x| SharedTaggableModelWithExists {
            value: x.value.clone(),
            utime: reformat_date(&x.utime),
            exists: true,
        })
        .collect();
    let mut topics: Vec<SharedTaggableModelWithExists> = existing_taggables
        .topics
        .iter()
        .map(|x| SharedTaggableModelWithExists {
            value: x.value.clone(),
            utime: reformat_date(&x.utime),
            exists: true,
        })
        .collect();
    let mut mdx_note_equations: Vec<MdxNoteEquationModel> = Vec::new();
    let mut mdx_note_tags: Vec<MdxNoteTagModel> = Vec::new();
    let mut mdx_note_subjects: Vec<MdxNoteSubjectModel> = Vec::new();
    let mut mdx_note_topics: Vec<MdxNoteTopicModel> = Vec::new();
    let mut notes: Vec<MdxNoteModel> = Vec::new();
    let mut note_links: Vec<MdxNoteLinkModel> = Vec::new();
    let mut mdx_note_dictionary_entries: Vec<MdxNoteDictionaryEntryModel> = Vec::new();
    let mut dictionary_entries: Vec<DictionaryEntryModel> = Vec::new();
    let mut mdx_note_bib_entry: Vec<MdxNoteBibEntryModel> = Vec::new();
    let mut front_matter: Vec<FrontMatterModel> = Vec::new();
    for item in groups.iter().filter(|x| !x.mdx.raw_body.is_empty()) {
        for dict_entry in item.dictionary_entries.clone() {
            mdx_note_dictionary_entries.push(MdxNoteDictionaryEntryModel {
                mdx_note_file_path: item.mdx.file_path.clone(),
                dictionary_entry_label: dict_entry.label.clone(),
            });
            dictionary_entries.push(dict_entry.clone());
        }
        notes.push(item.mdx.clone());
        for citation in item.citations.clone() {
            mdx_note_bib_entry.push(MdxNoteBibEntryModel {
                mdx_note_file_path: item.mdx.file_path.clone(),
                bib_entry_id: citation.id,
            })
        }
        front_matter.push(item.front_matter.clone());
        for note_link in item.note_links.clone() {
            note_links.push(note_link.clone());
        }
        for eq in item.equations.clone() {
            equations.push(eq.clone());
            if let Some(item_equation_id) = eq.equation_id {
                if !mdx_note_equations.iter().any(|x| {
                    (x.equation_id == item_equation_id.clone())
                        && (x.mdx_note_file_path == item.mdx.file_path)
                }) {
                    mdx_note_equations.push(MdxNoteEquationModel {
                        mdx_note_file_path: item.mdx.file_path.clone(),
                        equation_id: item_equation_id,
                    })
                }
            } else {
                log::error!("Attempted to link an equation without a user defined id.")
            }
        }
        for t in item.tags.clone() {
            if !taggable_vec_exists(&tags, &t) {
                tags.push(SharedTaggableModelWithExists {
                    value: t.value.clone(),
                    utime: t.utime.clone(),
                    exists: false,
                });
            }
            if !mdx_note_tags
                .iter()
                .any(|x| x.tag_value == t.value && x.mdx_note_file_path == item.mdx.file_path)
            {
                mdx_note_tags.push(MdxNoteTagModel {
                    mdx_note_file_path: item.mdx.file_path.clone(),
                    tag_value: t.value,
                })
            }
        }
        if item.front_matter.subject.is_some() {
            let s = item.front_matter.subject.as_ref().unwrap();
            if !taggable_vec_exists(&subjects, s) {
                subjects.push(SharedTaggableModelWithExists {
                    value: s.value.clone(),
                    utime: s.utime.clone(),
                    exists: false,
                });
            }
            if !mdx_note_subjects
                .iter()
                .any(|x| x.subject_value == s.value && x.mdx_note_file_path == item.mdx.file_path)
            {
                mdx_note_subjects.push(MdxNoteSubjectModel {
                    mdx_note_file_path: item.mdx.file_path.clone(),
                    subject_value: s.value.clone(),
                })
            }
        }

        if item.front_matter.topic.is_some() {
            let t = item.front_matter.topic.as_ref().unwrap();
            if !taggable_vec_exists(&topics, t) {
                topics.push(SharedTaggableModelWithExists {
                    value: t.value.clone(),
                    utime: t.utime.clone(),
                    exists: false,
                });
            }
            if !mdx_note_topics
                .iter()
                .any(|x| x.topic_value == t.value && x.mdx_note_file_path == item.mdx.file_path)
            {
                mdx_note_topics.push(MdxNoteTopicModel {
                    mdx_note_file_path: item.mdx.file_path.clone(),
                    topic_value: t.value.clone(),
                })
            }
        }
    }
    // Once everything is sorted and joining tables are created, save everything.
    // Removed equationEntity syncing because it was causing a build error, and they're being
    // inserted by the user anyways. This was ust updating something that wasn't changing like
    // an idiot.
    // EquationEntity::save_many(db, equations).await?;
    TagEntity::save_many(
        db,
        tags.iter()
            .filter_map(|t| {
                if t.exists {
                    None
                } else {
                    Some(SharedTaggableModel {
                        value: t.value.clone(),
                        utime: t.utime.clone(),
                    })
                }
            })
            .collect(),
    )
    .await?;
    SubjectEntity::create_many(
        db,
        subjects
            .iter()
            .filter_map(|t| {
                if t.exists {
                    None
                } else {
                    Some(SharedTaggableModel {
                        value: t.value.clone(),
                        utime: t.utime.clone(),
                    })
                }
            })
            .collect(),
    )
    .await?;
    TopicEntity::create_many(
        db,
        topics
            .iter()
            .filter_map(|t| {
                if t.exists {
                    None
                } else {
                    Some(SharedTaggableModel {
                        value: t.value.clone(),
                        utime: t.utime.clone(),
                    })
                }
            })
            .collect(),
    )
    .await?;
    MdxNoteTagEntity::create_many(db, mdx_note_tags).await?;
    MdxNoteSubjectEntity::create_many(db, mdx_note_subjects).await?;
    MdxNoteTopicEntity::create_many(db, mdx_note_topics).await?;
    MdxNoteEntity::save_many(db, notes).await?;
    MdxNoteEquationEntity::save_many(db, mdx_note_equations).await?;
    FrontMatterEntity::save_many(db, front_matter).await?;
    MdxNoteLinkEntity::create_many(db, note_links).await?;
    DictionaryEntryEntity::create_many(db, dictionary_entries).await?;
    MdxNoteDictionaryEntryEntity::create_many(db, mdx_note_dictionary_entries).await?;
    MdxNoteBibEntryEntity::create_many(db, mdx_note_bib_entry).await?;
    Ok(())
}

#[cfg(test)]
mod tests {
    use std::ops::Index;

    use crate::core::database::db::get_database;

    use super::*;

    #[tokio::test]
    async fn reformats_date() {
        let db_res = get_database().await;
        let db = db_res.lock().await;
        let tags = TagEntity::get_many(&db)
            .await
            .expect("Gets tags without throwing an error.");
        println!("utime: {}", tags.index(0).utime);
        let d = reformat_date(&tags.index(0).utime);
        println!("Data: {}", d);
        assert!(d != "0", "Returns a non-empty date")
    }
}
