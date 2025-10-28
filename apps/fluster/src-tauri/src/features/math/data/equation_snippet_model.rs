use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Deserialize, Type, Clone, Debug)]
pub struct EquationSnippetModel {
    /// This mapes to the id field in the equation struct, *not* the equation_id field.
    pub equation_id: String,
    /// This mapes to the id field in the snippet struct, *not* the equation_id field.
    pub snippet_id: String,
}
