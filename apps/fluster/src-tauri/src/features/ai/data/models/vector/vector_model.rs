use rig::Embed;
use serde::{Deserialize, Serialize};

#[derive(Clone, Serialize, Deserialize, strum_macros::Display)]
pub enum VectorSource {
    #[serde(rename = "mdx_note")]
    MdxNote,
}

#[derive(Embed, Clone, Serialize, Deserialize)]
pub struct VectorModel {
    pub id: String,
    pub source: VectorSource,
    #[embed]
    pub content: String,
    /// The stringified json data for the given VectorSource
    pub data: String,
    pub vec: Vec<f32>,
}
