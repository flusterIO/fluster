use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Type, Serialize, Deserialize)]
pub enum ValidTabularFileExtensions {
    Csv,
}

impl ValidTabularFileExtensions {
    fn as_str(&self) -> &'static str {
        match self {
            ValidTabularFileExtensions::Csv => "csv",
        }
    }
}
