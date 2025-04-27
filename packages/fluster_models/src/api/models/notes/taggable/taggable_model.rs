use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Taggable {
    value: String,
}

impl Taggable {
    pub fn from_string(val: String) -> Taggable {
        Taggable { value: val }
    }
}
