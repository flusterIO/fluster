use fluster_types::errors::errors::FlusterError;
use serde::{Deserialize, Serialize};
use surrealdb::Object;
use tsify::Tsify;

#[derive(Serialize, Deserialize, Debug, Tsify)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct MdxNoteEntity {
    pub id: String,
    pub raw_body: String,
    pub ctime: String,
    pub atime: String,
    pub mtime: String,
}

#[derive(Deserialize, Debug)]
pub struct MdxNoteForCreate {
    pub id: String,
    pub raw_body: String,
    pub ctime: String,
    pub atime: String,
    pub mtime: String,
}

impl TryFrom<Object> for MdxNoteEntity {
    type Error = FlusterError;
    fn try_from(mut val: Object) -> Result<Self, Self::Error> {
        MdxNoteEntity {
            id: val.get("id"),
            raw_body: val.get("raw_body")?,
            ctime: val.get("ctime")?,
            atime: val.get("ctime")?,
            mtime: val.get("ctime")?,
        }
    }
}

/// The MdxNote's backend model controller.
pub struct MdxNoteBmc {}
