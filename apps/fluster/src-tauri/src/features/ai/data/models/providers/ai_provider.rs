use crate::{
    core::{
        sync::parse_directory::sync_fs_directory::models::sync_filesystem_options::SyncFilesystemDirectoryOptions,
        types::{errors::errors::FlusterResult, FlusterDb},
    },
    features::mdx::data::mdx_note_group::MdxNoteGroup,
};

pub trait AiProvider {
    async fn save_note_vectors(
        &self,
        db: &FlusterDb<'_>,
        opts: &SyncFilesystemDirectoryOptions,
        notes: Vec<MdxNoteGroup>,
    ) -> FlusterResult<bool>;
}
