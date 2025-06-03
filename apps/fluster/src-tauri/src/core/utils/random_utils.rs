pub fn new_uuid() -> String {
    uuid::Uuid::new_v4().to_string()
}

#[tauri::command]
#[specta::specta]
pub async fn get_unique_id() -> String {
    new_uuid()
}
