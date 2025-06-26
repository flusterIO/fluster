use kalosm::language::*;

use crate::{
    core::types::errors::errors::{FlusterError, FlusterResult},
    features::mdx::data::mdx_note_group::MdxNoteGroup,
};
use log::error;

pub struct LocalAiClient {}

// FIX: Move this all to a trait once this is in order to allow for a remote client as well.
impl LocalAiClient {
    pub async fn get_text_embeddings(&self, notes: &mut [MdxNoteGroup]) -> FlusterResult<()> {
        let bert = Bert::new_for_search().await.map_err(|e| {
            error!("Error: {:?}", e);
            FlusterError::FailToLoadModel
        })?;

        for note in notes.iter_mut() {
            let vector = bert.embed(note.mdx.raw_body.clone()).await.map_err(|e| {
                println!("Error: {:?}", e);
                FlusterError::FailToCreateEmbeddingVector
            })?;

            note.mdx.vec = vector.vector().to_vec();
        }
        Ok(())
    }
}

#[cfg(test)]
mod tests {

    use crate::core::database::db::get_database;

    use super::*;

    #[tokio::test]
    async fn gets_embeddings() {
        let db_res = get_database().await;
        let db = db_res.lock().await;
        let mut models: Vec<MdxNoteGroup> = Vec::new();
        let model = MdxNoteGroup::from_file_system_path(
            &db,
            "/Users/bigsexy/Desktop/notes/content/physics/brainstorm/gravityBrainstorm.mdx"
                .to_string(),
            None,
        )
        .await
        .expect("Get's test mdx file without throwing an error.");
        models.push(model);
        let res = LocalAiClient {}.get_text_embeddings(&mut models).await;
        assert!(res.is_ok(), "Get's embeddings without throwing an error.");
    }
}
