use crate::api::schema::generated::main_schema::taggable;
use diesel::prelude::*;
use diesel_derive_enum::DbEnum;
use serde::{Deserialize, Serialize};

use super::{
    tag_front_matter_join::TaggableWithFrontMatterJoin, tag_mdx_note_join::TaggableWithMdxNoteJoin,
};

#[derive(Debug, Deserialize, Serialize, Clone, PartialEq, Eq, DbEnum)]
#[ExistingTypePath = "crate::api::schema::generated::main_schema::sql_types::TaggableType"]
pub enum TaggableType {
    Tag,
    Topic,
    Subject,
}

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
    pub tag_type: TaggableType,
}

#[derive(Debug, Deserialize, Serialize, Clone, PartialEq, Eq, Insertable)]
#[diesel(table_name = taggable, check_for_backend(diesel::pg::Pg))]
pub struct TagCreatable {
    pub id: Option<i32>,
    pub value: String,
    pub tag_type: TaggableType,
}

impl TagEntity {
    pub fn to_front_matter_join(&self, front_matter_id: i32) -> TaggableWithFrontMatterJoin {
        TaggableWithFrontMatterJoin {
            id: None,
            tag_id: self.id,
            front_matter_id,
        }
    }
    pub fn get_mdx_note_join(&self, mdx_note_id: i32) -> TaggableWithMdxNoteJoin {
        TaggableWithMdxNoteJoin {
            id: None,
            tag_id: self.id,
            mdx_note_id,
        }
    }
}
