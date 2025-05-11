use crate::api::schema::generated::main_schema::snippet;
use diesel::prelude::*;
use fluster_types::constants::supported_syntax_language::SupportedSyntaxLanguage;
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
    Insertable,
    Identifiable,
    QueryableByName,
)]
#[diesel(table_name = snippet, check_for_backend(diesel::pg::Pg))]
pub struct Snippet {
    pub label: String,
    pub language: SupportedSyntaxLanguage,
    pub body: String,
}
