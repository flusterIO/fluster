use crate::api::schema::generated::main_schema::snippet;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use super::supported_language::SupportedSyntaxLanguage;

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
#[diesel(table_name = snippet, check_for_backend(diesel::pg::Pg))]
pub struct Snippet {
    pub id: i32,
    pub label: String,
    pub desc: String,
    pub lang: SupportedSyntaxLanguage,
    pub body: String,
}
