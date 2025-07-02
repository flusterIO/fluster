#[tauri::command]
#[specta::specta]
pub async fn linspace(from: f64, to: f64, n_items: usize) -> Vec<f64> {
    ndarray::linspace(from, to, n_items).collect()
}
