use crate::api::schema::generated::main_schema::tag;
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
#[diesel(table_name = tag, check_for_backend(diesel::pg::Pg))]
pub struct TagEntity {
    pub id: i32,
    pub value: String,
}

pub struct TagCreatable {
    pub id: Option<i32>,
    pub value: String,
}
