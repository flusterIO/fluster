use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(strum_macros::Display, Type, Debug, Deserialize, Serialize, Clone, PartialEq, Eq)]
pub enum TaggableTypeEnum {
    Tag,
    Topic,
    Subject,
}
