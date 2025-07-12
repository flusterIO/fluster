use crate::features::plot::data::{
    embedded_themes::read_plotly_theme, plotly_theme_names::PlotlyTheme,
};

#[tauri::command]
#[specta::specta]
pub async fn get_plotly_theme(theme_id: PlotlyTheme) -> String {
    read_plotly_theme(theme_id).await
}
