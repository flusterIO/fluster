use diesel::prelude::*;
use fluster_db::generated::main_schema::reading_list;
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(
    Debug,
    Deserialize,
    Serialize,
    Clone,
    PartialEq,
    Eq,
    Tsify,
    Queryable,
    Selectable,
    Insertable,
    Identifiable,
    QueryableByName,
)]
#[diesel(table_name = reading_list, check_for_backend(diesel::pg::Pg))]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct ReadingListEntity {
    pub id: i32,
    pub label: String,
    pub desc: String,
    /// Created time.
    pub ctime: chrono::NaiveDateTime,
}
