use crate::core::db::generated::main_schema::equation;
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
    Insertable,
    Identifiable,
    QueryableByName,
)]
#[diesel(table_name = equation, check_for_backend(diesel::pg::Pg))]
pub struct EquationEntity {
    pub id: i32,
    pub label: String,
    pub desc: String,
}
