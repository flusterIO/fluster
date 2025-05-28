use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Debug, Type, Deserialize, Serialize, Clone, Default)]
pub enum MathLabelOption {
    #[default]
    Ams,
    All,
    None,
}

#[derive(Type)]
pub struct ParseMdxParams {
    math_labels: MathLabelOption,
}
