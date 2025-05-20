use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::core::db::generated::main_schema::mdx_note;

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
#[diesel(table_name = mdx_note, check_for_backend(diesel::pg::Pg))]
pub struct MdxNoteEntity {
    pub id: i32,
    pub file_path: Option<String>,
    pub raw_body: String,
    pub ctime: Option<chrono::NaiveDateTime>,
    pub mtime: Option<chrono::NaiveDateTime>,
    pub atime: Option<chrono::NaiveDateTime>,
    pub last_sync: chrono::NaiveDateTime,
}
