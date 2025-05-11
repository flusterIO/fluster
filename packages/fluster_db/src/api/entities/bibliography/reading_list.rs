use crate::api::schema::generated::main_schema::reading_list;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};
use Tsify::tsify;

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
#[diesel(table_name = reading_list, check_for_backend(diesel::pg::Pg))]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct ReadingListEntity {
    pub id: i32,
    pub label: String,
    pub desc: String,
    /// Created time.
    pub ctime: chrono::NaiveDateTime,
}
