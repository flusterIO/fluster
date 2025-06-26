// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/p
pub mod core;
pub mod features;
use crate::core::sync::sync_local_database::sync_local_database;
use crate::core::utils::commands::get_operating_system::get_operating_system;
use crate::core::utils::file_system::fs_commands::{
    fs_file_extension_glob, fs_glob, read_file_to_bytes, read_utf8_file, save_utf8_file,
};
use crate::core::utils::initialize::initialize_database::initialize_database;
use crate::core::utils::initialize::initialize_desktop::initialize_desktop;
use crate::core::utils::random_utils::get_unique_id;
use crate::core::utils::search::get_text_similarity::get_text_similarity;
use crate::features::ai::commands::add_chat_request::add_ai_chat_request;
use crate::features::ai::commands::create_ai_chat::create_new_ai_chat;
use crate::features::ai::commands::delete_chat_by_id::delete_chat_by_id;
use crate::features::ai::commands::get_ai_chat_by_id::get_ai_chat_by_id;
use crate::features::ai::commands::get_all_chats::get_all_ai_chats;
use crate::features::bibliography::commands::bib_entry_full_text_search::bib_entries_full_text_search;
use crate::features::bibliography::commands::get_bib_entries::get_bib_entries;
use crate::features::bibliography::commands::get_bib_entry_by_id::get_bib_entry_by_id;
use crate::features::bibliography::commands::get_bib_entry_count::get_bib_entry_count;
use crate::features::bibliography::commands::save_bib_entry::save_bib_entries;
use crate::features::bibliography::commands::sync_bib::sync_bib;
use crate::features::bookmark::commands::add_bookmark::add_bookmark;
use crate::features::bookmark::commands::file_path_is_bookmarked::file_path_is_bookmarked;
use crate::features::bookmark::commands::get_bookmarked_notes::get_bookmarked_notes;
use crate::features::bookmark::commands::remove_bookmark::remove_bookmark;
use crate::features::dashboard::get_dashboard_data::get_dashboard_data;
use crate::features::dictionary::commands::get_dictionary_entries::get_dictionary_entries;
use crate::features::dictionary::dictionary_entry_model::DictionaryEntryModel;
use crate::features::editor::write_file::write_file;
use crate::features::embedded_docs::get_embedded_doc_by_id::get_embedded_doc;
use crate::features::math::commands::delete_equation_by_id::delete_equation_by_id;
use crate::features::math::commands::get_equation_by_id::get_equation_by_id;
use crate::features::math::commands::get_equations::get_equations;
use crate::features::math::commands::read_mathjax_file::{read_mathjax, read_mathjax_font_file};
use crate::features::math::commands::save_equation::save_equations;
use crate::features::mdx::actions::component_utils::generate_qr_code::get_qr_code_svg;
use crate::features::mdx::actions::full_text_search::mdx_note_full_text_search;
use crate::features::mdx::actions::get_note_count::get_note_count;
use crate::features::mdx::actions::get_toc::{get_toc_from_fs_path, get_toc_from_markdown};
use crate::features::mdx::actions::parse_mdx_string::parse_mdx_string;
use crate::features::mdx::actions::read_mdx_file::read_mdx_file;
use crate::features::mdx::actions::remove_front_matter::remove_front_matter;
use crate::features::mdx::actions::set_last_read_by_file_path::set_last_read_by_file_path;
use crate::features::mdx::read_mdx_from_fs::read_mdx_from_fs;
use crate::features::search::commands::get_note_summaries::get_note_summaries;
use crate::features::search::commands::semantic_search::search::semantic_search;
use crate::features::search::data::search_params::{SearchOrder, SearchParams};
use crate::features::settings::delete_setting_state::delete_setting_state;
use crate::features::settings::get_setting_state::get_setting_state;
use crate::features::settings::save_setting_state::save_setting_state;
use crate::features::snippets::data::snippet_model::SnippetModel;
use crate::features::snippets::delete_snippet_by_id::delete_snippet_by_id;
use crate::features::snippets::get_snippet_by_id::get_snippet_by_id;
use crate::features::snippets::get_snippets::get_snippets;
use crate::features::snippets::save_snippet::save_snippets;
use crate::features::task_manager::commands::count_tasks_in_list::count_tasks_in_list;
use crate::features::task_manager::commands::create_task::create_task;
use crate::features::task_manager::commands::create_task_list::create_task_list;
use crate::features::task_manager::commands::delete_task_by_id::delete_task_by_id;
use crate::features::task_manager::commands::delete_task_list_by_id::delete_task_list_by_id;
use crate::features::task_manager::commands::get_all_task_lists::get_all_task_lists;
use crate::features::task_manager::commands::get_task_by_id::get_task_by_id;
use crate::features::task_manager::commands::get_task_count::get_task_count;
use crate::features::task_manager::commands::get_task_list_count::get_task_list_count;
use crate::features::task_manager::commands::get_task_list_data::get_task_list_data;
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
            // -- General Utils --
            get_operating_system,
            // -- Component Utils --
            get_dashboard_data,
            get_qr_code_svg,
            // -- Search --
            get_text_similarity,
            get_unique_id,
            // -- File System --
            sync_local_database,
            save_utf8_file,
            read_utf8_file,
            read_file_to_bytes,
            write_file,
            fs_glob,
            fs_file_extension_glob,
            initialize_database,
            initialize_desktop,
            // -- Docs & Health --
            get_embedded_doc,
            get_desktop_health_report,
            // -- Bookmark --
            add_bookmark,
            remove_bookmark,
            get_bookmarked_notes,
            file_path_is_bookmarked,
            get_dictionary_entries,
            // -- Mdx --
            read_mdx_from_fs,
            read_mdx_file,
            parse_mdx_string,
            set_last_read_by_file_path,
            remove_front_matter,
            get_note_summaries,
            get_toc_from_markdown,
            get_toc_from_fs_path,
            mdx_note_full_text_search,
            get_note_count,
            // -- Settings --
            delete_setting_state,
            save_setting_state,
            get_setting_state,
            // -- Math --
            read_mathjax_font_file,
            read_mathjax,
            get_mathjax_path,
            get_equations,
            save_equations,
            get_equation_by_id,
            delete_equation_by_id,
            // -- Search --
            semantic_search,
            // -- Snippets --
            save_snippets,
            get_snippets,
            delete_snippet_by_id,
            get_snippet_by_id,
            // -- Bib --
            get_bib_entries,
            get_bib_entry_count,
            sync_bib,
            save_bib_entries,
            get_bib_entry_by_id,
            bib_entries_full_text_search,
            // -- AI --
            get_ai_chat_by_id,
            create_new_ai_chat,
            get_all_ai_chats,
            delete_chat_by_id,
            add_ai_chat_request,
            // -- Task Manager --
            create_task,
            create_task_list,
            delete_task_by_id,
            delete_task_list_by_id,
            get_task_by_id,
            get_task_list_data,
            count_tasks_in_list,
            get_all_task_lists,
            get_task_list_count,
            get_task_count,
        ])
        .events(collect_events![ShowToast, SetDbConnectionUri])
        .typ::<FlusterError>()
        .typ::<DictionaryEntryModel>()
        .typ::<SnippetModel>()
        .typ::<SearchParams>()
        .typ::<SearchOrder>()
        .typ::<InternalEmbeddedDocsId>()
        .typ::<SyncFilesystemDirectoryOptions>();
    #[cfg(debug_assertions)] // So we don't export types on release builds.
    cmds.export(
        Typescript::default().bigint(specta_typescript::BigIntExportBehavior::String),
        "../../../packages/fluster_developer/src/lib/bindings.ts",
    )
    .expect("Exports bindings to typescript.");
    #[cfg(debug_assertions)] // So we don't export types on release builds.
    cmds.export(
        Typescript::default().bigint(specta_typescript::BigIntExportBehavior::String),
        "../src/core/lib/bindings.ts",
    )
    .expect("Exports bindings to typescript.");
    // Export to developer package as well, since all components will be running in a Fluster
    // environment.
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_single_instance::init(|_, _, _| {}))
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_network::init())
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
