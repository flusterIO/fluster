#[tauri::command]
#[specta::specta]
pub async fn arange(from: f64, to: f64, step: f64) -> Vec<f64> {
    ndarray::range(from, to, step).collect()
}
