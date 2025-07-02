use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Type, Deserialize, Serialize)]
pub struct ArrayGeneratorProps {
    pub min: f64,
    pub max: f64,
    pub count: usize,
}
