use crate::api::schema::generated::main_schema::topic;
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
#[diesel(table_name = topic, check_for_backend(diesel::pg::Pg))]
pub struct TopicEntity {
    pub id: i32,
    pub value: String,
}
