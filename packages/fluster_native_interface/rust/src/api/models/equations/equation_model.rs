use diesel::prelude::*;
use crate::api::data_interface::database::schema::generated::main_schema::equation;
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
