use crate::features::math::data::props::number_props::AxisGeneratorProps;

use super::linspace::linspace;

#[tauri::command]
#[specta::specta]
pub async fn axis_grid(axis: AxisGeneratorProps) -> Vec<Vec<f64>> {
    let mut axis_data: Vec<Vec<f64>> = Vec::new();
    for _ in 0..axis.count {
        let j = linspace(axis.min, axis.max, axis.count).await;
        axis_data.push(j);
    }
    axis_data
}

#[tauri::command]
#[specta::specta]
pub async fn grid_2d(x: AxisGeneratorProps, y: AxisGeneratorProps) -> Vec<Vec<Vec<f64>>> {
    let (_x, _y) = tokio::join!(axis_grid(x), axis_grid(y));
    vec![_x, _y]
}
