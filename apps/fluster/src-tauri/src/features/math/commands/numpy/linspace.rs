use std::num;

#[tauri::command]
#[specta::specta]
pub async fn linspace(from: f64, to: f64, n_items: f64) -> Vec<f64> {
    let items: Vec<f64> = Vec::new();
    // let gap = math.a(to - from) / step
    // numpy::ndarray::range(from, to, step).collect()
    items
}
