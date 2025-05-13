use crate::api::{
    data_interface::database::schema::generated::main_schema::snippet,
    models::enums::supported_language::SupportedSyntaxLanguage,
};
use diesel::prelude::*;
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
