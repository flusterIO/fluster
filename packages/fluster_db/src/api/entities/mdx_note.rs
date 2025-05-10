use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Clone, PartialEq, Eq, Queryable, Selectable)]
#[diesel(table_name = crate::api::schema::schema::mdx_note)]
pub struct MdxNote {
    pub id: i32,
    pub raw_body: String,
    pub file_path: String,
    pub ctime: Option<chrono::NaiveDateTime>,
    pub mtime: Option<chrono::NaiveDateTime>,
    pub atime: Option<chrono::NaiveDateTime>,
}
