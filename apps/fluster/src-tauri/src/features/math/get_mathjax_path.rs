use crate::core::database::db::get_data_dir;

/// Returns the string which points the location of mathjax that needs to be passed to the front
/// end. This is the location that mathjax is copied *to*, not from.
#[tauri::command]
#[specta::specta]
pub fn get_mathjax_path() -> String {
    return get_data_dir()
        .unwrap()
        .join("mathjax")
        .join("tex-chtml.js")
        .to_str()
        .unwrap()
        .to_string();
}
