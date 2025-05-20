use crate::core::db::generated::main_schema::reading_list;
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
    Type,
    Queryable,
    Selectable,
    Insertable,
    Identifiable,
    QueryableByName,
)]
#[diesel(table_name = reading_list, check_for_backend(diesel::pg::Pg))]
pub struct ReadingListEntity {
    pub id: i32,
    pub label: String,
    pub desc: String,
    /// Created time.
    pub ctime: chrono::NaiveDateTime,
}
