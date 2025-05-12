use crate::api::schema::generated::main_schema::subject;
use diesel::prelude::*;
use regex::Regex;
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
#[diesel(table_name = subject, check_for_backend(diesel::pg::Pg))]
pub struct SubjectEntity {
    pub id: i32,
    pub value: String,
}
