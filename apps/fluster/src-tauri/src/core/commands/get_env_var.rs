#[tauri::command]
#[specta::specta]
pub async fn get_env_var(env_var: String) -> Option<String> {
    match std::env::var(env_var) {
        Ok(x) => Some(x),
        Err(_) => None,
    }
}
