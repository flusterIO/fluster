use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::api::schema::generated::main_schema::mdx_note;

#[derive(Serialize, Deserialize, Clone, Queryable, Identifiable)]
#[diesel(table_name = mdx_note, check_for_backend(diesel::pg::Pg))]
pub struct MdxNoteSummary {
    pub id: i32,
}
