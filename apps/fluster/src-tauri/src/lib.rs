// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/p
pub mod core;
pub mod features;
use crate::core::sync::sync_local_database::sync_local_database;
use crate::core::utils::file_system::fs_commands::read_utf8_file;
use crate::core::utils::file_system::fs_commands::save_utf8_file;
use crate::core::utils::initialize::initialize_database::initialize_database;
use crate::core::utils::initialize::initialize_desktop::initialize_desktop;
use crate::core::utils::random_utils::get_unique_id;
use crate::features::dashboard::get_dashboard_data::get_dashboard_data;
use crate::features::dictionary::commands::get_dictionary_entries::get_dictionary_entries;
use crate::features::dictionary::dictionary_entry_model::DictionaryEntryModel;
use crate::features::embedded_docs::get_embedded_doc_by_id::get_embedded_doc;
use crate::features::math::commands::delete_equation_by_id::delete_equation_by_id;
use crate::features::math::commands::get_equation_by_id::get_equation_by_id;
use crate::features::math::commands::get_equations::get_equations;
use crate::features::math::commands::read_mathjax_file::{read_mathjax, read_mathjax_font_file};
use crate::features::math::commands::save_equation::save_equations;
use crate::features::mdx::read_mdx_from_fs::read_mdx_from_fs;
use crate::features::settings::delete_setting_state::delete_setting_state;
use crate::features::settings::get_setting_state::get_setting_state;
use crate::features::settings::save_setting_state::save_setting_state;
use crate::features::snippets::delete_snippet_by_id::delete_snippet_by_id;
use crate::features::snippets::get_snippet_by_id::get_snippet_by_id;
use crate::features::snippets::get_snippets::get_snippets;
use crate::features::snippets::save_snippet::save_snippets;
use crate::features::snippets::snippet_model::SnippetModel;
use core::sync::parse_directory::sync_fs_directory::models::sync_filesystem_options::SyncFilesystemDirectoryOptions;
use core::{
    events::{set_db_connection_uri::SetDbConnectionUri, show_toast::ShowToast},
    types::errors::errors::FlusterError,
};
pub use features::dashboard;
use features::embedded_docs::data::internal_embedded_docs_id::InternalEmbeddedDocsId;
pub use features::health::get_health_report::get_desktop_health_report;
use features::math::get_mathjax_path::get_mathjax_path;
use specta_typescript::Typescript;
use tauri_specta::{collect_commands, collect_events, Builder};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let cmds = Builder::<tauri::Wry>::new()
        .commands(collect_commands![
            sync_local_database,
            get_dashboard_data,
            save_snippets,
            get_snippets,
            delete_snippet_by_id,
            get_snippet_by_id,
            read_mdx_from_fs,
            save_utf8_file,
            read_utf8_file,
            get_embedded_doc,
            get_desktop_health_report,
            get_mathjax_path,
            delete_setting_state,
            save_setting_state,
            get_setting_state,
            initialize_database,
            initialize_desktop,
            get_dictionary_entries,
            save_equations,
            get_equation_by_id,
            delete_equation_by_id,
            get_equations,
            get_unique_id,
            read_mathjax_font_file,
            read_mathjax
        ])
        .events(collect_events![ShowToast, SetDbConnectionUri])
        .typ::<FlusterError>()
        .typ::<DictionaryEntryModel>()
        .typ::<SnippetModel>()
        .typ::<InternalEmbeddedDocsId>()
        .typ::<SyncFilesystemDirectoryOptions>();
    #[cfg(debug_assertions)] // So we don't export types on release builds.
    cmds.export(
        Typescript::default().bigint(specta_typescript::BigIntExportBehavior::String),
        "../src/core/lib/bindings.ts",
    )
    .expect("Exports bindings to typescript.");
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
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
