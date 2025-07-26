use crate::core::types::errors::errors::FlusterResult;

use super::parse_directory::sync_fs_directory::{
    models::sync_filesystem_options::SyncFilesystemDirectoryOptions,
    sync_methods::sync_mdx_notes::sync_mdx_filesystem_notes,
};

/// This wraps a series of functions handled by the fluster_native_interface package, conditionally
/// based on user settings and app state.
#[tauri::command]
#[specta::specta]
pub async fn sync_local_database(opts: SyncFilesystemDirectoryOptions) -> FlusterResult<()> {
    sync_mdx_filesystem_notes(&opts).await
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn syncs_directory() {
        let opts = SyncFilesystemDirectoryOptions {
            dir_path: "/Users/bigsexy/Desktop/notes/content/".to_string(),
            use_git_ignore: false,
            ..Default::default()
        };
        let res = sync_local_database(opts).await;
        println!("Response: {:#?}", res);
        assert!(res.is_ok(), "Parses directory without throwing an error.");
    }
}
