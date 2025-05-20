use crate::core::{events::show_toast::ShowToast, types::errors::errors::FlusterError};
use serde::{Deserialize, Serialize};
use specta::Type;
use tauri::{ipc::Channel, Emitter};

#[derive(Type, Serialize, Deserialize, Debug)]
pub struct SyncFilesystemDirectoryOptions {
    pub dir_path: String,
    pub bib_path: Option<String>,
    pub n_threads: u32,
}

/// This wraps a series of functions handled by the fluster_native_interface package, conditionally
/// based on user settings and app state.
#[tauri::command]
#[specta::specta]
pub async fn sync_local_database(
    app: tauri::AppHandle,
    opts: SyncFilesystemDirectoryOptions,
    on_error: Channel<FlusterError>,
) {
    let dir_res = crate::core::sync::parse_directory::sync_fs_directory::sync_filesystem_directory::sync_directory(&app, opts, on_error).await;
    if dir_res.is_err() {
        let t = ShowToast::new(
            "Error".to_string(),
            "An error occurred while syncing your database.".to_string(),
            5000,
            crate::core::events::show_toast::ToastVariant::Error,
        );
        &app.emit("show-toast", t);
    }
}
