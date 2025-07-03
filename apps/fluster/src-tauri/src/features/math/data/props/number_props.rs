use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Type, Deserialize, Serialize)]
pub struct AxisGeneratorProps {
    pub min: f64,
    pub max: f64,
    pub count: usize,
    pub label: Option<String>,
}
