use crate::core::db::generated::main_schema::bib_entry;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};
use specta::Type;

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
#[diesel(table_name = bib_entry, check_for_backend(diesel::pg::Pg))]
pub struct BibEntryEntity {
    pub id: i32,
    pub pdf_path: Option<String>,
    pub read: bool,
    /// This is the stringified json of the objects fields.
    /// The 'label/key' field is seperate, as that should always exst.
    // pub entry: BibtexEntry,
    pub data: serde_json::Value,
}
