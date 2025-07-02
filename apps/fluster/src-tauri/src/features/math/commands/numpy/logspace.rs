#[tauri::command]
#[specta::specta]
pub async fn logspace(base: f64, a: f64, b: f64, n: usize) -> Vec<f64> {
    ndarray::logspace(base, a, b, n).collect()
}
