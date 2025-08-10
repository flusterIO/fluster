use crate::{
    core::sync::parse_directory::sync_fs_directory::models::sync_filesystem_options::SyncFilesystemDirectoryOptions,
    features::ai::data::traits::ai_provider::AiProvider,
};

use super::local_ai_provider::LocalAiClient;

pub fn get_ai_provider(_opts: &SyncFilesystemDirectoryOptions) -> impl AiProvider {
    LocalAiClient {}
}
