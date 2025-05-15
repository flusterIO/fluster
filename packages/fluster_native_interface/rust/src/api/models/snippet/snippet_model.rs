use crate::api::models::enums::supported_language::SupportedSyntaxLanguage;
use diesel::prelude::*;
use fluster_db::generated::main_schema::snippet;
use flutter_rust_bridge::frb;
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
    Identifiable,
    Insertable,
    QueryableByName,
)]
#[diesel(table_name = snippet, check_for_backend(diesel::pg::Pg))]
#[frb(ignore)]
pub struct Snippet {
    pub id: i32,
    pub label: String,
    pub desc: String,
    pub lang: String,
    pub body: String,
}

impl Snippet {
    pub fn new(
        label: String,
        desc: String,
        lang: SupportedSyntaxLanguage,
        body: String,
        id: i32,
    ) -> Snippet {
        Snippet {
            id,
            label,
            desc,
            lang: lang.to_string(),
            body,
        }
    }
}
