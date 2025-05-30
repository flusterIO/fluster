use chrono::Utc;
use serde::{Deserialize, Serialize};
use specta::Type;

use crate::core::types::traits::db_entity::FlusterDateTime;

#[derive(Type, Serialize, Deserialize, Debug, Clone)]
pub struct SharedTaggableModel {
    pub value: String,
    pub ctime: FlusterDateTime,
}

impl SharedTaggableModel {
    pub fn new(val: String, ctime: Option<FlusterDateTime>) -> SharedTaggableModel {
        let _ctime = match ctime {
            Some(x) => x,
            None => Utc::now(),
        };
        SharedTaggableModel {
            value: val,
            ctime: _ctime,
        }
    }
}
