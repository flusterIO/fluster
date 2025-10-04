use tauri::{AppHandle, Manager};

use crate::core::types::errors::errors::FlusterResult;

#[tauri::command]
#[specta::specta]
pub async fn hide_splash_screen(app: AppHandle) -> FlusterResult<()> {
    let splash_window = app.get_webview_window("splashscreen").unwrap();
    let main_window = app.get_webview_window("main").unwrap();
    splash_window.close().unwrap();
    main_window.show().unwrap();
    Ok(())
}
