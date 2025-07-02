use super::front_matter_model::FrontMatterModel;
use super::mdx_note_link_entity::MdxNoteLinkEntity;
use super::mdx_note_link_model::MdxNoteLinkModel;
use super::mdx_note_model::MdxNoteModel;
use crate::core::models::taggable::shared_taggable_model::SharedTaggableModel;
use crate::core::models::taggable::tag_entity::TagEntity;
use crate::core::types::errors::errors::{FlusterError, FlusterResult};
use crate::core::types::traits::mdx_parser::MdxParser;
use crate::core::types::FlusterDb;
use crate::features::bibliography::data::bib_entry_entity::BibEntryEntity;
use crate::features::bibliography::data::bib_entry_mdx_parser::BibEntryMdxParser;
use crate::features::bibliography::data::bib_entry_model::BibEntryModel;
use crate::features::dictionary::dictionary_entry_model::DictionaryEntryModel;
use crate::features::dictionary::dictionary_entry_parser::DictionaryEntryMdxParser;
use crate::features::math::data::equation_entity::EquationEntity;
use crate::features::math::data::equation_model::EquationModel;
use crate::features::math::data::equation_tag_mdx_parser::EquationTagMdxParser;
use chrono::Utc;
use filetime::FileTime;
use gray_matter::{engine::YAML, Matter};
use serde::{Deserialize, Serialize};
use specta::Type;
use std::fs;
use std::fs::Metadata;

#[derive(Debug, Clone, Serialize, Deserialize, Type)]
pub struct MdxNoteGroup {
    pub mdx: MdxNoteModel,
    pub front_matter: FrontMatterModel,
    pub tags: Vec<SharedTaggableModel>,
    pub equations: Vec<EquationModel>,
    pub dictionary_entries: Vec<DictionaryEntryModel>,
    pub citations: Vec<BibEntryModel>,
    pub note_links: Vec<MdxNoteLinkModel>,
}

impl MdxNoteGroup {
    async fn handle_fs_parse(
        db: &FlusterDb<'_>,
        raw_file_content: String,
        file_path: String,
        file_meta: &Metadata,
    ) -> FlusterResult<MdxNoteGroup> {
        let mut note_data =
            MdxNoteGroup::from_raw_mdx_string(db, raw_file_content, file_path.to_string()).await?;
        let ctime = match FileTime::from_creation_time(file_meta) {
            Some(x) => chrono::DateTime::from_timestamp(x.unix_seconds(), 0).unwrap(),
            None => chrono::DateTime::from_timestamp(Utc::now().timestamp(), 0).unwrap(),
        };
        note_data.mdx.ctime = ctime.timestamp_millis().to_string();
        Ok(note_data)
    }
    pub async fn from_file_system_path(
        db: &FlusterDb<'_>,
        file_path: String,
        existing_note: Option<&MdxNoteModel>,
    ) -> FlusterResult<MdxNoteGroup> {
        let raw_file_content = fs::read_to_string(&file_path)
            .map_err(|_| FlusterError::FailToReadFileSystemPath(file_path.clone()))?;
        let file_meta = fs::metadata(&file_path)
            .map_err(|_| FlusterError::FailToReadFileSystemPath(file_path.clone()))?;
        let note =
            MdxNoteGroup::handle_fs_parse(db, raw_file_content, file_path, &file_meta).await?;
        if existing_note.is_some() {
            // FIXME: Set fields that should persist and cannot be derived from the file system here. This is currently throwing an error.
            // &existing_note.unwrap().last_read
            // note.mdx.last_read =
            //     chrono::DateTime::<Utc>::from_str(&existing_note.unwrap().last_read)
            //         .unwrap()
            //         .timestamp_millis()
            //         .to_string();
        }
        Ok(note)
    }
    pub async fn from_raw_mdx_string(
        db: &FlusterDb<'_>,
        raw_file_content: String,
        file_path: String,
    ) -> FlusterResult<MdxNoteGroup> {
        let now = Utc::now().timestamp_millis().to_string();
        let matter = Matter::<YAML>::new();
        let result = matter.parse(&raw_file_content);
        // -- Begin Parsers --
        let post_tag_parse = TagEntity::from_mdx_content(&result);
        let post_dictionary_parse =
            DictionaryEntryMdxParser {}.parse_mdx(&post_tag_parse.new_content);
        let post_bib_parse = BibEntryMdxParser {}.parse_mdx(&post_dictionary_parse.new_content);
        let post_equation_tag_parse =
            EquationTagMdxParser {}.parse_mdx(&post_bib_parse.new_content);
        let post_note_link_parse =
            MdxNoteLinkEntity {}.parse_mdx(&post_equation_tag_parse.new_content, &file_path);

        // -- Gather parser data --
        let citations = BibEntryEntity::get_by_ids(db, post_bib_parse.results).await?;
        let equations =
            EquationEntity::get_by_user_provided_ids(db, post_equation_tag_parse.results).await?;
        // for mut eq in equations.clone() {
        //     println!("Eq: {:?}", eq.ctime);
        //     eq.ctime = parse_date(&eq.ctime).unwrap().to_string();
        // }
        // -- End Parsers --
        Ok(MdxNoteGroup {
            dictionary_entries: post_dictionary_parse.results,
            front_matter: FrontMatterModel::from_gray_matter(result.data, &file_path),
            citations,
            mdx: MdxNoteModel {
                raw_body: post_note_link_parse.new_content,
                file_path,
                ctime: now,
                last_read: "0".to_string(),
                vec: Vec::new(),
            },
            //RESUME: The equation tags are not yet being parsed.
            equations,
            tags: post_tag_parse.results,
            note_links: post_note_link_parse.results,
        })
    }
}

#[cfg(test)]
mod tests {
    use fluster_test_utils::test_utils::get_test_mdx_path;

    use crate::core::database::db::get_database;

    use super::*;

    fn assert_front_matter_good(note_data: Result<MdxNoteGroup, FlusterError>) {
        assert!(
            note_data.is_ok(),
            "Parses a file system mdx note without throwing an error."
        );
        let n = note_data.unwrap();
        let tags = n.front_matter.tags;
        assert!(tags[0].value == "Tag 1", "Gathers tags properly.");
        assert!(
            n.front_matter.subject.clone().unwrap().value == "Subject 1",
            "Gathers subjects properly."
        );
        assert!(
            n.front_matter.topic.clone().unwrap().value == "Topic 1",
            "Gathers topics properly."
        );
    }

    #[tokio::test]
    async fn from_file_system_path_parses_properly() {
        let db_res = get_database().await;
        let db = db_res.lock().await;

        let test_path = get_test_mdx_path();
        let note_data =
            MdxNoteGroup::from_file_system_path(&db, test_path.to_str().unwrap().to_string(), None)
                .await;
        assert_front_matter_good(note_data);
    }
}
