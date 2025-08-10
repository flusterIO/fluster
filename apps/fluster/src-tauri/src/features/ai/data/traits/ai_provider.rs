use crate::core::sync::parse_directory::sync_fs_directory::models::sync_filesystem_options::SyncFilesystemDirectoryOptions;
use async_trait::async_trait;

use crate::{
    core::types::errors::errors::FlusterResult, features::mdx::data::mdx_note_group::MdxNoteGroup,
};

#[async_trait]
pub trait AiProvider {
    async fn get_text_embeddings(
        &self,
        notes: &mut [MdxNoteGroup],
        opts: &SyncFilesystemDirectoryOptions,
    ) -> FlusterResult<()>;
}
