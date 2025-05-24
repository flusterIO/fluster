// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/p
pub mod core;
pub mod features;
use core::{
    events::{set_db_connection_uri::SetDbConnectionUri, show_toast::ShowToast},
    sync::sync_local_database::SyncFilesystemDirectoryOptions,
    types::errors::errors::FlusterError,
};

use crate::core::sync::sync_local_database::sync_local_database;
use crate::features::dictionary::dictionary_entry::DictionaryEntry;
use crate::features::snippets::snippet_model::SnippetItem;
pub use features::dashboard;
use specta_typescript::Typescript;
use tauri_specta::{collect_commands, collect_events, Builder};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let cmds = Builder::<tauri::Wry>::new()
        .commands(collect_commands![
            sync_local_database,
            crate::features::dashboard::get_dashboard_data::get_dashboard_data,
            crate::features::snippets::save_snippet::save_snippet,
            crate::features::snippets::get_snippets::get_snippets,
        ])
        .events(collect_events![ShowToast, SetDbConnectionUri])
        .typ::<FlusterError>()
        .typ::<DictionaryEntry>()
        .typ::<SnippetItem>()
        .typ::<SyncFilesystemDirectoryOptions>();
    #[cfg(debug_assertions)] // So we don't export types on release builds.
    cmds.export(Typescript::default(), "../src/core/lib/bindings.ts")
        .expect("Exports bindings to typescript.");
    tauri::Builder::default()
        .plugin(tauri_plugin_single_instance::init(|_, _, _| {}))
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
        .invoke_handler(cmds.invoke_handler())
        .setup(move |app| {
            cmds.mount_events(app);
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
