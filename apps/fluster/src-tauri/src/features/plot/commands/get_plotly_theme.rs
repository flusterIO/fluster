use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::plot::data::{embedded_themes::read_plotly_theme, plotly_theme_names::PlotlyTheme},
};

#[tauri::command]
#[specta::specta]
pub async fn get_plotly_theme(theme_id: PlotlyTheme) -> String {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    read_plotly_theme(theme_id).await
}
