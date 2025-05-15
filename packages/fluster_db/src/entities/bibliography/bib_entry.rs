use crate::generated::main_schema::bib_entry;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};
use tsify::Tsify;

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
    Tsify,
)]
#[diesel(table_name = bib_entry, check_for_backend(diesel::pg::Pg))]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct BibEntryEntity {
    pub id: i32,
    pub pdf_path: Option<String>,
    pub read: bool,
    /// This is the stringified json of the objects fields.
    /// The 'label/key' field is seperate, as that should always exst.
    // pub entry: BibtexEntry,
    pub data: serde_json::Value,
}
