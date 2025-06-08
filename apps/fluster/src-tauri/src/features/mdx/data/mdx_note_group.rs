use crate::core::models::taggable::shared_taggable_model::SharedTaggableModel;
use crate::core::models::taggable::tag_entity::TagEntity;
use crate::core::types::errors::errors::{FlusterError, FlusterResult};
use chrono::Utc;
use filetime::FileTime;
use gray_matter::{engine::YAML, Matter};
use serde::{Deserialize, Serialize};
use specta::Type;
use std::fs;
use std::fs::Metadata;

use super::front_matter_model::FrontMatterModel;
use super::mdx_note_model::MdxNoteModel;

#[derive(Debug, Clone, Serialize, Deserialize, Type)]
pub struct MdxNoteGroup {
    pub mdx: MdxNoteModel,
    pub front_matter: FrontMatterModel,
    pub tags: Vec<SharedTaggableModel>,
    pub equation_ids: Vec<String>,
}

impl MdxNoteGroup {
    fn handle_fs_parse(
        raw_file_content: String,
        file_path: String,
        file_meta: &Metadata,
    ) -> FlusterResult<MdxNoteGroup> {
        let mut note_data =
            MdxNoteGroup::from_raw_mdx_string(raw_file_content, file_path.to_string())
                .map_err(|_| FlusterError::FailToUpsertTags)?;
        let ctime = match FileTime::from_creation_time(file_meta) {
            Some(x) => chrono::DateTime::from_timestamp(x.unix_seconds(), 0).unwrap(),
            None => chrono::DateTime::from_timestamp(Utc::now().timestamp(), 0).unwrap(),
        };
        note_data.mdx.ctime = ctime.timestamp_millis().to_string();
        Ok(note_data)
    }
    pub fn from_file_system_path(file_path: String) -> FlusterResult<MdxNoteGroup> {
        let raw_file_content = fs::read_to_string(&file_path)
            .map_err(|_| FlusterError::FailToReadFileSystemPath(file_path.clone()))?;
        let file_meta = fs::metadata(&file_path)
            .map_err(|_| FlusterError::FailToReadFileSystemPath(file_path.clone()))?;
        MdxNoteGroup::handle_fs_parse(raw_file_content, file_path, &file_meta)
    }
    pub async fn from_file_system_path_async(file_path: String) -> FlusterResult<MdxNoteGroup> {
        let raw_file_content = tokio::fs::read_to_string(&file_path)
            .await
            .map_err(|_| FlusterError::FailToReadFileSystemPath(file_path.clone()))?;
        let file_meta = tokio::fs::metadata(&file_path)
            .await
            .map_err(|_| FlusterError::FailToReadFileSystemPath(file_path.clone()))?;
        MdxNoteGroup::handle_fs_parse(raw_file_content, file_path, &file_meta)
    }
    pub fn from_raw_mdx_string(
        raw_file_content: String,
        file_path: String,
    ) -> FlusterResult<MdxNoteGroup> {
        let now = Utc::now().timestamp_millis().to_string();
        let matter = Matter::<YAML>::new();
        let result = matter.parse(&raw_file_content);
        let post_tag_parse = TagEntity::from_mdx_content(&result);
        Ok(MdxNoteGroup {
            front_matter: FrontMatterModel::from_gray_matter(result.data, &file_path),
            mdx: MdxNoteModel {
                raw_body: post_tag_parse.parsed_content,
                file_path,
                ctime: now,
                last_read: "0".to_string(),
            },
            //FIXME: The equation tags are not yet being parsed.
            equation_ids: Vec::new(),
            tags: post_tag_parse.tags,
        })
    }
}

#[cfg(test)]
mod tests {
    use fluster_test_utils::test_utils::get_test_mdx_path;

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

    #[test]
    fn from_file_system_path_parses_properly() {
        let test_path = get_test_mdx_path();
        let note_data =
            MdxNoteGroup::from_file_system_path(test_path.to_str().unwrap().to_string());
        assert_front_matter_good(note_data);
    }

    #[tokio::test]
    async fn from_file_system_path_async_parses_properly() {
        let test_path = get_test_mdx_path();
        let note_data =
            MdxNoteGroup::from_file_system_path_async(test_path.to_str().unwrap().to_string())
                .await;
        assert_front_matter_good(note_data);
    }
}
