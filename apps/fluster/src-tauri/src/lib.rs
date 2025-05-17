// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/p

pub mod features;
pub use features::dashboard;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_single_instance::init(|_, _, _| {
            // let _ = app
            //     .get_webview_window("main")
            //     .expect("no main window")
            //     .set_focus();
        }))
        .plugin(tauri_plugin_opener::init())
        .plugin(
            tauri_plugin_log::Builder::new()
                .target(tauri_plugin_log::Target::new(
                    tauri_plugin_log::TargetKind::LogDir {
                        file_name: Some("logs".to_string()),
                    },
                ))
                .max_file_size(50_000)
                .build(),
        )
        .invoke_handler(tauri::generate_handler![
            dashboard::get_dashboard_data::get_dashboard_data
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
