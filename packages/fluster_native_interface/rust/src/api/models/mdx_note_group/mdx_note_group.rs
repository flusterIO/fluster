use filetime::FileTime;
use fluster_db::{
    api::db::FlusterError,
    entities::{
        mdx_note::{front_matter::FrontMatterEntity, mdx_note_creatable::MdxNoteCreatable},
        taggable::tag_model::TagEntity,
    },
};
use fluster_types::errors::errors::FlusterResult;
use gray_matter::{engine::YAML, Matter};
use std::fs;

use crate::api::models::taggables::taggable::Taggable;

pub struct MdxNoteGroup {
    pub mdx: MdxNoteCreatable,
    pub front_matter: FrontMatterEntity,
    pub tags: Vec<Taggable>,
}

impl MdxNoteGroup {
    pub fn from_file_system_path(file_path: String) -> FlusterResult<MdxNoteGroup> {
        let raw_file_content = fs::read_to_string(&file_path);
        let file_meta = fs::metadata(&file_path);
        if file_meta.is_err() {
            return Err(FlusterError::MdxParsingError(file_path.to_owned()));
        }
        if let Ok(content) = raw_file_content {
            if let Ok(mut note_data) =
                MdxNoteGroup::from_raw_mdx_string(content, Some(file_path.to_string()))
            {
                note_data.mdx.atime = Some(chrono::NaiveDateTime::from_timestamp(
                    FileTime::from_last_access_time(file_meta.as_ref().unwrap()).seconds(),
                    0,
                ));
                note_data.mdx.ctime = Some(chrono::NaiveDateTime::from_timestamp(
                    FileTime::from_creation_time(file_meta.as_ref().unwrap())
                        .or(Some(FileTime::now()))
                        .unwrap()
                        .seconds(),
                    0,
                ));
                note_data.mdx.mtime = Some(chrono::NaiveDateTime::from_timestamp(
                    FileTime::from_last_modification_time(file_meta.as_ref().unwrap()).seconds(),
                    0,
                ));
                Ok(note_data)
            } else {
                Err(FlusterError::MdxParsingError(file_path.to_owned()))
            }
        } else {
            Err(FlusterError::MdxParsingError(file_path.to_owned()))
        }
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
            front_matter: FrontMatterEntity::from_gray_matter(result.data),
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
