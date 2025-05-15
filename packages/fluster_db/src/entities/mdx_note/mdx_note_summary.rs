use diesel::prelude::*;
use fluster_db::generated::main_schema::mdx_note;
use flutter_rust_bridge::frb;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Debug, Deserialize, Clone, Queryable, Identifiable)]
#[diesel(table_name = mdx_note, check_for_backend(diesel::pg::Pg))]
#[frb(opaque)]
pub struct MdxNoteSummary {
    pub id: i32,
    pub file_path: Option<String>,
    pub raw_body: String,
    pub ctime: Option<chrono::NaiveDateTime>,
    pub mtime: Option<chrono::NaiveDateTime>,
    pub atime: Option<chrono::NaiveDateTime>,
}
