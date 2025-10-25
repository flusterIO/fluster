use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Serialize, Deserialize, strum_macros::Display)]
pub enum VectorSource {
    #[serde(rename = "mdx_note")]
    #[strum(to_string = "mdx_note")]
    MdxNote,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct MdxNoteVectorData {
    pub file_path: String,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct VectorModel {
    pub id: String,
    pub source: VectorSource,
    pub content: String,
    /// The stringified json data for the given VectorSource
    pub data: String,
    pub vec: Vec<f32>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct VectorModelWithDistance {
    pub id: String,
    pub source: VectorSource,
    pub content: String,
    /// The stringified json data for the given VectorSource
    pub data: String,
    pub _distance: f32,
}
