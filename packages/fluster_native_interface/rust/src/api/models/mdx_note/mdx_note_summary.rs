use diesel::prelude::*;
use flutter_rust_bridge::frb;
use serde::{Deserialize, Serialize};

use crate::api::data_interface::database::schema::generated::main_schema::mdx_note;

#[derive(Serialize, Debug, Deserialize, Clone, Queryable, Identifiable)]
#[diesel(table_name = mdx_note, check_for_backend(diesel::pg::Pg))]
#[frb(non_opaque)]
pub struct MdxNoteSummary {
    pub id: i32,
    pub file_path: Option<String>,
    pub raw_body: String,
    pub ctime: Option<chrono::NaiveDateTime>,
    pub mtime: Option<chrono::NaiveDateTime>,
    pub atime: Option<chrono::NaiveDateTime>,
}
