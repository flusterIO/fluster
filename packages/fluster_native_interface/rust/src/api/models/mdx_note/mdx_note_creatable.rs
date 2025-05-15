use diesel::prelude::*;
use fluster_db::generated::main_schema::mdx_note;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Clone, PartialEq, Eq, Insertable)]
#[diesel(table_name = mdx_note, check_for_backend(diesel::pg::Pg))]
pub struct MdxNoteCreatable {
    pub id: Option<i32>,
    pub file_path: Option<String>,
    pub raw_body: String,
    pub ctime: Option<chrono::NaiveDateTime>,
    pub mtime: Option<chrono::NaiveDateTime>,
    // pub atime: Option<chrono::NaiveDateTime>,
}

// impl MdxNoteCreatable {
// }
