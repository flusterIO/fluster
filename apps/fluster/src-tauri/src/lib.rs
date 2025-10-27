// Learn more about Tauri commandseat https://tauri.app/develop/calling-rust/p
pub mod core;
pub mod features;
use crate::core::commands::get_env_var::get_env_var;
use crate::core::commands::get_parsable_files::get_parsable_files;
use crate::core::commands::load_binary_file::load_binary_file;
use crate::core::events::event_keys::CrossLanguageEvents;
use crate::core::events::event_props::AiChatMessageUpdateEventProps;
use crate::core::sync::sync_local_database::sync_local_database;
use crate::core::sync::wipe_database::wipe_database;
use crate::core::utils::commands::get_env_variable::get_environment_variable;
use crate::core::utils::commands::get_operating_system::get_operating_system;
use crate::core::utils::commands::normalize_path::normalize_path;
use crate::core::utils::file_system::fs_commands::path_exists;
use crate::core::utils::file_system::fs_commands::{
    fs_file_extension_glob, fs_glob, get_files_by_file_extensions, read_file_to_bytes,
    read_utf8_file, save_utf8_file,
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
use crate::features::ai::commands::get_local_ollama_models::get_local_ollama_models;
use crate::features::ai::commands::get_ollama_model_info::get_ollama_model_info;
use crate::features::ai::commands::ollama_model_exists_locally::ollama_model_exists_locally;
use crate::features::ai::commands::save_chat_model::save_chat_model;
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
use crate::features::dictionary::dictionary_entry_model::{
    DictionaryEntryModel, DictionaryEntryModelWithoutSource,
};
use crate::features::editor::write_file::write_file;
use crate::features::embedded_docs::get_all_embedded_docs::get_all_embedded_docs;
use crate::features::embedded_docs::get_embedded_doc_by_id::get_embedded_doc;
use crate::features::embedded_docs::get_embedded_doc_by_id::get_embedded_doc_by_relative_path;
use crate::features::flashcard::commands::{
    add_flashcard_correct_status::set_flashcard_complete_status,
    delete_flashcard_by_id::delete_flashcard_by_id, get_flashcard_data::get_flashcard_data,
    get_flashcard_summaries::get_flashcard_summaries,
    get_flashcard_topics_and_subjects::get_flashcard_topics_and_subjects,
    save_flashcard::save_flashcard,
};
use crate::features::jupyter::commands::generate_new_jupyter_token::generate_new_token;
use crate::features::kanban::commands::create_kanban_board_card::create_new_kanban_board_card;
use crate::features::kanban::commands::create_new_kanban_board::create_new_kanban_board;
use crate::features::kanban::commands::delete_kanban_board::delete_kanban_board_by_id;
use crate::features::kanban::commands::delete_kanban_board_card::delete_kanban_board_card_by_id;
use crate::features::kanban::commands::get_kanban_board_by_id::get_kanban_board_by_id;
use crate::features::kanban::commands::get_kanban_board_list::get_kanban_board_list;
use crate::features::math::commands::delete_equation_by_id::delete_equation_by_id;
use crate::features::math::commands::get_equation_by_id::get_equation_by_id;
use crate::features::math::commands::get_equation_by_id::get_equation_by_user_provided_id;
use crate::features::math::commands::get_equations::get_equations;
use crate::features::math::commands::save_equation::save_equation;
use crate::features::mdx::actions::component_utils::generate_qr_code::get_qr_code_svg;
use crate::features::mdx::actions::full_text_search::mdx_note_full_text_search;
use crate::features::mdx::actions::get_note_by_user_provided_id::get_note_by_user_provided_id;
use crate::features::mdx::actions::get_note_count::get_note_count;
use crate::features::mdx::actions::get_note_group_by_file_path::get_note_group_by_file_path;
use crate::features::mdx::actions::get_toc::{get_toc_from_fs_path, get_toc_from_markdown};
use crate::features::mdx::actions::parse_mdx_string::parse_mdx_string;
use crate::features::mdx::actions::read_mdx_file::read_mdx_file;
use crate::features::mdx::actions::remove_front_matter::remove_front_matter;
use crate::features::mdx::actions::set_last_read_by_file_path::set_last_read_by_file_path;
use crate::features::mdx::read_mdx_from_fs::read_mdx_from_fs;
use crate::features::search::commands::get_note_by_dict_entry::get_note_by_dict_entry_label;
use crate::features::search::commands::get_note_summaries::get_note_summaries;
use crate::features::search::commands::get_notes_by_bib_entry::get_notes_by_bib_entry_id;
use crate::features::search::commands::get_notes_by_equation_id::get_notes_by_equation_id;
use crate::features::search::commands::get_recently_accessed::get_recently_accessed_notes;
use crate::features::search::commands::semantic_search::search::semantic_search;
use crate::features::search::data::search_params::{SearchOrder, SearchParams};
use crate::features::settings::commands::create_auto_setting::create_auto_setting;
use crate::features::settings::commands::delete_auto_setting_by_id::delete_auto_setting_by_id;
use crate::features::settings::commands::get_all_auto_settings::get_all_auto_settings;
use crate::features::settings::delete_setting_state::delete_setting_state;
use crate::features::settings::get_setting_state::get_setting_state;
use crate::features::settings::save_setting_state::save_setting_state;
use crate::features::snippets::data::snippet_model::SnippetModel;
use crate::features::snippets::delete_snippet_by_id::delete_snippet_by_id;
use crate::features::snippets::get_snippet_by_id::get_snippet_by_id;
use crate::features::snippets::get_snippets::get_snippets;
use crate::features::snippets::save_snippet::save_snippet;
use crate::features::splash_screen::hide_splash_screen::hide_splash_screen;
use crate::features::tabular::commands::load_tabular_file::load_tabular_file;
use crate::features::tabular::data::valid_tabular_file_extensions::ValidTabularFileExtensions;
use crate::features::taggables::commands::get_all_subjects::get_all_subjects;
use crate::features::taggables::commands::get_all_tags::get_all_tags;
use crate::features::taggables::commands::get_all_topics::get_all_topics;
use crate::features::taggables::commands::get_existing_taggables::get_existing_taggables;
use crate::features::taggables::commands::get_subject_search_results::get_subject_search_results;
use crate::features::taggables::commands::get_tag_search_results::get_tag_search_results;
use crate::features::taggables::commands::get_topic_search_results::get_topic_search_results;
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
use crate::features::task_manager::commands::get_task_list_tasks::get_task_list_tasks;
use crate::features::task_manager::commands::get_tasks_with_due_date::get_incomplete_tasks_with_due_date;
use crate::features::whiteboard::commands::load_whiteboard_initial_data::load_whiteboard_initial_data;
use crate::features::whiteboard::commands::save_whiteboard_data::save_whiteboard_data;
use core::database::db::get_database_path;
use core::sync::parse_directory::sync_fs_directory::models::sync_filesystem_options::SyncFilesystemDirectoryOptions;
use core::{
    events::{set_db_connection_uri::SetDbConnectionUri, show_toast::ToastConfig},
    types::errors::errors::FlusterError,
};
pub use features::dashboard;
use features::embedded_docs::data::internal_embedded_docs_id::InternalEmbeddedDocsId;
pub use features::health::get_health_report::get_desktop_health_report;
use features::math::commands::numpy::{
    arange::arange, grid::axis_grid, grid::grid_2d, linspace::linspace, logspace::logspace,
};
use features::math::get_mathjax_path::get_mathjax_path;
use features::plot::commands::get_plotly_theme::get_plotly_theme;
use tauri_plugin_prevent_default::Flags;
use tauri_specta::{collect_commands, collect_events, Builder};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let prevent = tauri_plugin_prevent_default::Builder::new()
        .with_flags(Flags::all().difference(Flags::FIND | Flags::RELOAD))
        .build();
    let cmds = Builder::<tauri::Wry>::new()
        .commands(collect_commands![
            // -- General Utils --
            get_operating_system,
            path_exists,
            normalize_path,
            hide_splash_screen,
            load_binary_file,
            load_tabular_file,
            get_database_path,
            get_parsable_files,
            get_env_var,
            // -- Auto Settings --
            create_auto_setting,
            get_all_auto_settings,
            delete_auto_setting_by_id,
            // -- Component Utils --
            get_dashboard_data,
            get_qr_code_svg,
            get_environment_variable,
            // -- Search --
            get_text_similarity,
            get_unique_id,
            get_tag_search_results,
            get_topic_search_results,
            get_subject_search_results,
            semantic_search,
            get_all_tags,
            get_all_subjects,
            get_all_topics,
            get_notes_by_bib_entry_id,
            get_notes_by_equation_id,
            get_note_by_dict_entry_label,
            get_existing_taggables,
            get_recently_accessed_notes,
            // -- File System --
            sync_local_database,
            save_utf8_file,
            read_utf8_file,
            read_file_to_bytes,
            write_file,
            fs_glob,
            fs_file_extension_glob,
            get_files_by_file_extensions,
            initialize_database,
            initialize_desktop,
            wipe_database,
            // -- Docs & Health --
            get_embedded_doc,
            get_desktop_health_report,
            get_embedded_doc_by_relative_path,
            get_all_embedded_docs,
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
            get_note_group_by_file_path,
            get_note_by_user_provided_id,
            // -- Settings --
            delete_setting_state,
            save_setting_state,
            get_setting_state,
            // -- Math --
            get_mathjax_path,
            get_equations,
            save_equation,
            get_equation_by_id,
            delete_equation_by_id,
            get_equation_by_user_provided_id,
            //     -- Numpy --
            grid_2d,
            logspace,
            arange,
            linspace,
            axis_grid,
            // -- Snippets --
            save_snippet,
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
            get_local_ollama_models,
            get_ollama_model_info,
            ollama_model_exists_locally,
            save_chat_model,
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
            get_incomplete_tasks_with_due_date,
            get_task_list_tasks,
            // -- Kanban Board --
            create_new_kanban_board,
            delete_kanban_board_by_id,
            delete_kanban_board_card_by_id,
            create_new_kanban_board_card,
            get_kanban_board_by_id,
            get_kanban_board_list,
            // -- Flashcard --
            save_flashcard,
            get_flashcard_data,
            get_flashcard_topics_and_subjects,
            delete_flashcard_by_id,
            get_flashcard_summaries,
            set_flashcard_complete_status,
            // -- Jupyter --
            generate_new_token,
            // -- Plotting --
            get_plotly_theme,
            // -- Whiteboard --
            load_whiteboard_initial_data,
            save_whiteboard_data
        ])
        .events(collect_events![ToastConfig, SetDbConnectionUri])
        .typ::<FlusterError>()
        .typ::<DictionaryEntryModel>()
        .typ::<SnippetModel>()
        .typ::<SearchParams>()
        .typ::<SearchOrder>()
        .typ::<InternalEmbeddedDocsId>()
        .typ::<DictionaryEntryModelWithoutSource>()
        .typ::<CrossLanguageEvents>()
        .typ::<AiChatMessageUpdateEventProps>()
        .typ::<ValidTabularFileExtensions>()
        .typ::<SyncFilesystemDirectoryOptions>();
    // #[cfg(target_os = "macos")]
    // {
    //     println!("cargo:rustc-link-arg=-Wl,-rpath,/opt/homebrew/Cellar/libiconv/1.18/lib");
    // }
    #[cfg(debug_assertions)] // So we don't export types on release builds.
    cmds.export(
        specta_typescript::Typescript::default()
            .bigint(specta_typescript::BigIntExportBehavior::String),
        "../../../packages/fluster_developer/src/lib/bindings.ts",
    )
    .expect("Exports bindings to typescript.");
    #[cfg(debug_assertions)] // So we don't export types on release builds.
    cmds.export(
        specta_typescript::Typescript::default()
            .bigint(specta_typescript::BigIntExportBehavior::String),
        "../src/core/lib/bindings.ts",
    )
    .expect("Exports bindings to typescript.");
    // Export to developer package as well, since all components will be running in a Fluster
    // environment.
    tauri::Builder::default()
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(prevent)
        .plugin(tauri_plugin_single_instance::init(|_, _, _| {}))
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_network::init())
        // .plugin(
        //     tauri_plugin_log::Builder::new()
        //         .target(tauri_plugin_log::Target::new(
        //             tauri_plugin_log::TargetKind::LogDir {
        //                 file_name: Some("logs".to_string()),
        //             },
        //         ))
        //         .max_file_size(50_000)
        //         .build(),
        // )
        .invoke_handler(cmds.invoke_handler())
        .setup(move |app| {
            cmds.mount_events(app);
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
