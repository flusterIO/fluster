use serde::{Deserialize, Serialize};

use crate::api::models::snippet::snippet_model::Snippet;

#[derive(Serialize, Deserialize, Debug, Clone, Default)]
pub struct EquationEntity {
    pub id: Option<String>,
    pub label: String,
    pub body: String,
    pub code: Vec<Snippet>,
}
