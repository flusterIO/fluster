use crate::api::schema::generated::main_schema::mdx_note;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Clone, PartialEq, Eq, Insertable)]
#[diesel(table_name = mdx_note, check_for_backend(diesel::pg::Pg))]
pub struct MdxNoteCreatable {
    pub id: Option<i32>,
    pub file_path: Option<String>,
    pub raw_body: String,
    pub ctime: chrono::NaiveDateTime,
    pub mtime: chrono::NaiveDateTime,
    pub atime: chrono::NaiveDateTime,
}
