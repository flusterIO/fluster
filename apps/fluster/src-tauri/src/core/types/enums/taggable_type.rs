use serde::{Deserialize, Serialize};

// #[diesel(table_name = taggable_type, check_for_backend(diesel::pg::Pg))]
#[derive(strum_macros::Display, Debug, Deserialize, Serialize, Clone, PartialEq, Eq)]
pub enum TaggableTypeEnum {
    Tag,
    Topic,
    Subject,
}
