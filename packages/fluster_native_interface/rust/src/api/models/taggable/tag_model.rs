use super::{
    tag_front_matter_join::TaggableWithFrontMatterJoin, tag_mdx_note_join::TaggableWithMdxNoteJoin,
};
use crate::api::{
    data_interface::database::schema::generated::main_schema::taggable,
    models::enums::taggable_type::TaggableTypeEnum,
};
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(
    Debug,
    Deserialize,
    Serialize,
    Clone,
    PartialEq,
    Eq,
    Queryable,
    Selectable,
    Insertable,
    Identifiable,
    QueryableByName,
)]
#[diesel(table_name = taggable, check_for_backend(diesel::pg::Pg))]
pub struct TagEntity {
    pub id: i32,
    pub value: String,
    pub tag_type: String,
}

#[derive(Debug, Deserialize, Serialize, Clone, PartialEq, Eq, Insertable)]
#[diesel(table_name = taggable, check_for_backend(diesel::pg::Pg))]
pub struct TagCreatable {
    pub id: Option<i32>,
    pub value: String,
    pub tag_type: String,
}

impl TagCreatable {
    pub fn new(value: String, tag_type: TaggableTypeEnum, id: Option<i32>) -> TagCreatable {
        TagCreatable {
            id,
            value,
            tag_type: tag_type.to_string(),
        }
    }
}

impl TagEntity {
    pub fn new(value: String, tag_type: TaggableTypeEnum, id: i32) -> TagEntity {
        TagEntity {
            id,
            value,
            tag_type: tag_type.to_string(),
        }
    }
    pub fn to_front_matter_join(&self, front_matter_id: i32) -> TaggableWithFrontMatterJoin {
        TaggableWithFrontMatterJoin {
            tag_id: self.id,
            front_matter_id,
        }
    }
    pub fn get_mdx_note_join(&self, mdx_note_id: i32) -> TaggableWithMdxNoteJoin {
        TaggableWithMdxNoteJoin {
            tag_id: self.id,
            mdx_note_id,
        }
    }
}
