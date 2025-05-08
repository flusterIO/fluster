use filetime::FileTime;
use fluster_types::{
    constants::database_constants::{FLUSTER_NAMESPACE, MDX_NOTE_TABLE_NAME, NOTES_DATABASE_NAME},
    errors::errors::FlusterError,
    FlusterDb,
};
use flutter_rust_bridge::frb;
use gray_matter::{engine::YAML, Matter};
use serde::{Deserialize, Serialize};
use std::fs;
use surrealdb::Uuid;
use tsify::Tsify;

use crate::api::models::{
    nested_models::fluster_datetime::fluster_time::FlusterTime,
    notes::front_matter::front_matter_model::FrontMatterEntity, taggable::tag_model::Tag,
};

pub struct MdxEntityBase {
    pub id: Option<surrealdb::sql::Thing>,
    pub raw_body: String,
    pub file_path: String,
    pub ctime: Option<FlusterTime>,
    pub mtime: Option<FlusterTime>,
    pub atime: Option<FlusterTime>,
}

#[derive(Serialize, Deserialize, Debug, Clone, Tsify)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct MdxNoteEntity {
    pub id: Option<surrealdb::sql::Thing>,
    pub front_matter: FrontMatterEntity,
    /// raw_body is equivalent to the raw file content with the front matter removed.
    pub raw_body: String,
    /// File path relative to the user's root notes directory.
    pub file_path: String,
    /// Time that the file was created.
    pub ctime: Option<FlusterTime>,
    /// Time that the file was last modified.
    pub mtime: Option<FlusterTime>,
    /// Time that the file was last accessed.
    pub atime: Option<FlusterTime>,
    /// Tags embedded within the note.
    pub tags: Vec<Tag>,
    // pub equations: Vec<EquationEntity>,
}

impl MdxNoteEntity {
    pub fn to_entity(&self) -> MdxEntityBase {
        MdxEntityBase {
            id: self.id.clone(),
            raw_body: self.raw_body.clone(),
            file_path: self.file_path.clone(),
            ctime: self.ctime.clone(),
            mtime: self.mtime.clone(),
            atime: self.atime.clone(),
        }
    }
    pub fn from_raw_mdx_string(
        raw_file_content: String,
        file_path: Option<String>,
    ) -> Result<MdxNoteEntity, FlusterError> {
        let matter = Matter::<YAML>::new();
        let result = matter.parse(&raw_file_content);
        let fp = file_path.unwrap_or("Unknown".to_string());
        let post_tag_parse = Tag::from_mdx_content(&result.content);
        Ok(MdxNoteEntity {
            front_matter: FrontMatterEntity::from_gray_matter(result.data),
            raw_body: result.content,
            file_path: fp.to_owned(),
            id: None,
            ctime: None,
            mtime: None,
            atime: None, // updated_at:
            tags: post_tag_parse.tags,
        })
    }
    /// All paths must be validated to ensure that they exist **before** pasing them into this
    /// function.
    pub fn from_file_system_path(file_path: &str) -> Result<MdxNoteEntity, FlusterError> {
        let raw_file_content = fs::read_to_string(file_path);
        let file_meta = fs::metadata(file_path);
        if file_meta.is_err() {
            return Err(FlusterError::MdxParsingError(file_path.to_owned()));
        }
        if let Ok(content) = raw_file_content {
            let note = MdxNoteEntity::from_raw_mdx_string(content, Some(file_path.to_string()));
            if let Ok(mut note_data) = note {
                note_data.atime = FlusterTime::from_file_time(Some(
                    FileTime::from_last_access_time(file_meta.as_ref().unwrap()),
                ));
                note_data.ctime = FlusterTime::from_file_time(FileTime::from_creation_time(
                    file_meta.as_ref().unwrap(),
                ));
                note_data.mtime = FlusterTime::from_file_time(Some(
                    FileTime::from_last_modification_time(file_meta.as_ref().unwrap()),
                ));
                Ok(note_data)
            } else {
                Err(FlusterError::MdxParsingError(file_path.to_owned()))
            }
        } else {
            Err(FlusterError::MdxParsingError(file_path.to_owned()))
        }
    }
}

#[allow(clippy::comparison_to_empty)]
impl MdxNoteEntity {
    #[frb(name = "save")]
    pub async fn save(&self, db: &FlusterDb) -> Option<FlusterError> {
        let err = db
            .use_ns(FLUSTER_NAMESPACE)
            .use_db(NOTES_DATABASE_NAME)
            .await;
        if err.is_ok() {
            let res: Result<Option<MdxEntityBase>, surrealdb::Error> = db
                .upsert((MDX_NOTE_TABLE_NAME, &self.get_id()))
                .content(self.to_entity())
                .await;
            if res.is_ok() {
                None
            } else {
                Some(FlusterError::FailToCreateEntity)
            }
        } else {
            Some(FlusterError::FailToCreateEntity)
        }
    }

    pub fn get_id(&self) -> String {
        if self.id.is_some() {
            self.id.clone().unwrap().to_raw()
        } else if self.file_path != "" {
            self.file_path.clone()
        } else {
            Uuid::new_v4().to_string()
        }
    }

    pub async fn from_id_string(id: &str, db: &FlusterDb) -> Result<MdxNoteEntity, FlusterError> {
        let item: Result<Option<MdxNoteEntity>, surrealdb::Error> =
            db.select((MDX_NOTE_TABLE_NAME, id)).await;
        if item.is_err() {
            return Err(FlusterError::FailToFindById);
        }
        if let Some(unwrapped) = item.unwrap() {
            Ok(unwrapped)
        } else {
            Err(FlusterError::FailToFindById)
        }
    }
}

#[cfg(test)]
mod tests {

    use fluster_db::api::db::get_database;

    use super::*;

    async fn get_test_note() -> Result<MdxNoteEntity, FlusterError> {
        let test_content_path = fluster_test_utils::test_utils::get_test_mdx_path();
        MdxNoteEntity::from_file_system_path(test_content_path.to_str().unwrap())
    }

    #[tokio::test]
    async fn parses_note_from_fs_successfully() {
        let note = get_test_note().await;
        assert!(note.is_ok(), "Note did not return errors.");
        assert_eq!(
            note.as_ref().unwrap().front_matter.title,
            "Title in frontmatter",
            "Front matter sets title properly"
        );

        assert_eq!(
            note.as_ref().unwrap().front_matter.summary.as_ref().unwrap(),
            "Vestibulum, convallis lectus id, in magnis enim tempor lacus imperdiet. Eget porta nulla auctor, et purus nulla tristique ac, imperdiet.Test summary",
            "Front matter sets summary properly"
        );

        assert_eq!(
            note.as_ref()
                .unwrap()
                .front_matter
                .note_id
                .as_ref()
                .unwrap(),
            "myTestNote",
            "Front matter sets id properly"
        );
    }

    #[tokio::test]
    async fn saves_parsed_note_successfully() {
        let note = get_test_note().await.expect("Failed to get test note.");
        let db = get_database().await;
        assert!(db.is_ok(), "Database is returned without error.");
        let res = note.save(db.as_ref().unwrap()).await;
        println!("{:?}", &res);
        assert!(
            res.is_none(),
            "Mdx note was saved without throwing an error."
        );
        let id = note.get_id();
        let found_item = MdxNoteEntity::from_id_string(&id, db.as_ref().unwrap());
        assert!(
            found_item.await.is_ok(),
            "Mdx note found by id after inserting item successfully"
        );
    }
}
