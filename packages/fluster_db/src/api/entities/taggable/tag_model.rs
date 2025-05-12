use crate::api::schema::generated::main_schema::taggable;
use diesel::prelude::*;
use diesel_derive_enum::DbEnum;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Clone, PartialEq, Eq, DbEnum)]
#[ExistingTypePath = "crate::api::schema::generated::main_schema::sql_types::TaggableType"]
pub enum TaggableType {
    Tag,
    Topic,
    Subject,
}

// impl Expression for TaggableType {
//     type SqlType;
// }

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
