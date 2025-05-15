use filetime::FileTime;
use fluster_types::errors::errors::{FlusterError, FlusterResult};
use gray_matter::{engine::YAML, Matter};
use std::fs;
use std::fs::Metadata;

use crate::api::models::front_matter::front_matter_model::FrontMatter;
use crate::api::models::mdx_note::mdx_note_creatable::MdxNoteCreatable;
use crate::api::models::taggable::taggable::Taggable;

#[derive(Debug, Clone)]
pub struct MdxNoteGroup {
    pub mdx: MdxNoteCreatable,
    pub front_matter: FrontMatter,
    pub tags: Vec<Taggable>,
}

impl MdxNoteGroup {
    fn handle_fs_parse(
        raw_file_content: String,
        file_path: String,
        file_meta: &Metadata,
    ) -> FlusterResult<MdxNoteGroup> {
        let mut note_data =
            MdxNoteGroup::from_raw_mdx_string(raw_file_content, Some(file_path.to_string()))
                .or_else(|_| Err(FlusterError::FailToUpsertTags))?;
        note_data.mdx.atime = Some(chrono::NaiveDateTime::from_timestamp(
            FileTime::from_last_access_time(file_meta).seconds(),
            0,
        ));
        note_data.mdx.ctime = Some(chrono::NaiveDateTime::from_timestamp(
            FileTime::from_creation_time(file_meta)
                .or(Some(FileTime::now()))
                .unwrap()
                .seconds(),
            0,
        ));
        note_data.mdx.mtime = Some(chrono::NaiveDateTime::from_timestamp(
            FileTime::from_last_modification_time(file_meta).seconds(),
            0,
        ));
        Ok(note_data)
    }
    pub fn from_file_system_path(file_path: String) -> FlusterResult<MdxNoteGroup> {
        let raw_file_content = fs::read_to_string(&file_path)
            .or_else(|_| Err(FlusterError::FailToReadFileSystemPath(file_path.clone())))?;
        let file_meta = fs::metadata(&file_path)
            .or_else(|_| Err(FlusterError::FailToReadFileSystemPath(file_path.clone())))?;
        MdxNoteGroup::handle_fs_parse(raw_file_content, file_path, &file_meta)
    }
    pub async fn from_file_system_path_async(file_path: String) -> FlusterResult<MdxNoteGroup> {
        let raw_file_content = tokio::fs::read_to_string(&file_path)
            .await
            .or_else(|_| Err(FlusterError::FailToReadFileSystemPath(file_path.clone())))?;
        let file_meta = tokio::fs::metadata(&file_path)
            .await
            .or_else(|_| Err(FlusterError::FailToReadFileSystemPath(file_path.clone())))?;
        MdxNoteGroup::handle_fs_parse(raw_file_content, file_path, &file_meta)
    }
    pub fn from_raw_mdx_string(
        raw_file_content: String,
        file_path: Option<String>,
    ) -> FlusterResult<MdxNoteGroup> {
        let matter = Matter::<YAML>::new();
        let result = matter.parse(&raw_file_content);
        let fp = file_path.unwrap_or("Unknown".to_string());
        let post_tag_parse = Taggable::from_mdx_content(&result);
        Ok(MdxNoteGroup {
            front_matter: FrontMatter::from_gray_matter(result.data),
            mdx: MdxNoteCreatable {
                id: None,
                raw_body: post_tag_parse.parsed_content,
                file_path: Some(fp),
                ctime: None,
                mtime: None,
                atime: None, // updated_at:
            },
            tags: post_tag_parse.tags,
        })
    }
}

#[cfg(test)]
mod tests {
    use fluster_test_utils::test_utils::get_test_mdx_path;

    use crate::api::models::enums::taggable_type::TaggableTypeEnum;

    use super::*;

    fn assert_front_matter_good(note_data: Result<MdxNoteGroup, FlusterError>) {
        assert!(
            note_data.is_ok(),
            "Parses a file system mdx note without throwing an error."
        );
        let n = note_data.unwrap();
        let tags = n.front_matter.tags;
        let topics = n.front_matter.topics;
        let subjects = n.front_matter.subjects;
        assert!(
            tags[0].value == "Tag 1" && tags[0].tag_type == TaggableTypeEnum::Subject.to_string(),
            "Gathers tags properly."
        );
        assert!(
            subjects[0].value == "Subject 1"
                && subjects[0].tag_type == TaggableTypeEnum::Subject.to_string(),
            "Gathers subjects properly."
        );
        assert!(
            topics[0].value == "Topic 1"
                && topics[0].tag_type == TaggableTypeEnum::Topic.to_string(),
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
