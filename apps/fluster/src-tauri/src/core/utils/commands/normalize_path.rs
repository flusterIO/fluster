/// Appends the path to the base_path if it is not already contained within the fs_path.
/// If the base_path is empty, it will always return the fs_path.
#[tauri::command]
#[specta::specta]
pub async fn normalize_path(fs_path: String, base_path: String) -> String {
    println!("Base Path: {:?}", base_path);
    let mut fp = fs_path.clone();
    if fs_path.starts_with("/") || fs_path.starts_with("\\") {
        fp = fp[1..fp.len()].to_string();
    }
    if base_path.is_empty() {
        println!("Here 1");
        return fs_path;
    }
    if fs_path.contains(&base_path) {
        println!("Here 2");
        fs_path
    } else {
        println!("Here 3");
        std::path::Path::new(&base_path)
            .join(fp)
            .to_str()
            .unwrap()
            .to_string()
    }
}
