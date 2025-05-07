use serde::{Deserialize, Serialize};
use tsify::Tsify;

#[derive(Debug, Tsify, Deserialize, Serialize, Clone, Default)]
pub enum MathLabelOption {
    #[default]
    Ams,
    All,
    None,
}

#[derive(Tsify)]
pub struct ParseMdxParams {
    math_labels: MathLabelOption,
}
