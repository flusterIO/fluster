use serde::{Deserialize, Serialize};
use specta::Type;

// #[diesel(table_name = taggable_type, check_for_backend(diesel::pg::Pg))]
#[derive(strum_macros::Display, Type, Debug, Deserialize, Serialize, Clone, PartialEq, Eq)]
pub enum TaggableTypeEnum {
    Tag,
    Topic,
    Subject,
}
