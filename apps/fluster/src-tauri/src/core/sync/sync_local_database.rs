use crate::core::types::errors::errors::FlusterResult;

use super::parse_directory::sync_fs_directory::models::sync_filesystem_options::SyncFilesystemDirectoryOptions;

/// This wraps a series of functions handled by the fluster_native_interface package, conditionally
/// based on user settings and app state.
#[tauri::command]
#[specta::specta]
pub async fn sync_local_database(opts: SyncFilesystemDirectoryOptions) -> FlusterResult<()> {
    crate::core::sync::parse_directory::sync_fs_directory::sync_filesystem_directory::sync_directory(opts).await
}
