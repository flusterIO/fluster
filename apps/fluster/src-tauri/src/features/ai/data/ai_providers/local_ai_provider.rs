use std::ops::Index;

use async_trait::async_trait;
use ollama_rs::{
    generation::embeddings::request::{EmbeddingsInput, GenerateEmbeddingsRequest},
    Ollama,
};

use crate::{
    core::{
        sync::parse_directory::sync_fs_directory::models::sync_filesystem_options::SyncFilesystemDirectoryOptions,
        types::errors::errors::FlusterResult,
    },
    features::{
        ai::data::{constants::VECTOR_DIMENSIONS, traits::ai_provider::AiProvider},
        mdx::data::mdx_note_group::MdxNoteGroup,
    },
};

pub struct LocalAiClient {}

#[async_trait]
impl AiProvider for LocalAiClient {
    async fn get_text_embeddings(
        &self,
        notes: &mut [MdxNoteGroup],
        opts: &SyncFilesystemDirectoryOptions,
    ) -> FlusterResult<()> {
        let ollama = Ollama::default();

        let vec_default = (0..VECTOR_DIMENSIONS).map(|_| 0.0).collect::<Vec<f32>>();

        for note in notes.iter_mut() {
            if opts.ai.with_ai {
                let request = GenerateEmbeddingsRequest::new(
                    opts.ai.embedding_model.clone(),
                    EmbeddingsInput::Single(note.mdx.raw_body.clone()),
                );
                let res = ollama.generate_embeddings(request).await.unwrap();
                if res.embeddings.len() == 1 {
                    note.mdx.vec = res.embeddings.index(0).to_vec();
                }
            } else if note.mdx.vec.len() != (VECTOR_DIMENSIONS as usize) {
                note.mdx.vec = vec_default.clone();
            }
        }
        Ok(())
    }
}

// #[cfg(test)]
// mod tests {

//     use crate::core::database::db::get_database;

//     use super::*;

//     #[tokio::test]
//     async fn gets_embeddings() {
//         let db_res = get_database().await;
//         let db = db_res.lock().await;
//         let mut models: Vec<MdxNoteGroup> = Vec::new();
//         let model = MdxNoteGroup::from_file_system_path(
//             &db,
//             "/Users/bigsexy/Desktop/notes/content/physics/brainstorm/gravityBrainstorm.mdx"
//                 .to_string(),
//             None,
//         )
//         .await
//         .expect("Get's test mdx file without throwing an error.");
//         models.push(model);
//         let res = LocalAiClient {}
//             .get_text_embeddings(&mut models, true)
//             .await;
//         assert!(res.is_ok(), "Get's embeddings without throwing an error.");
//     }
// }
