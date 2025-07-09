use include_dir::{include_dir, Dir};

use super::plotly_theme_names::PlotlyTheme;

static EMBEDDED_PLOTLY_THEMES: Dir =
    include_dir!("$CARGO_MANIFEST_DIR/src/features/plot/data/theme_data");

pub async fn read_plotly_theme(theme: PlotlyTheme) -> String {
    let res = EMBEDDED_PLOTLY_THEMES
        .get_file(theme.to_string())
        .expect("Reads plotly theme successfully.");
    res.contents_utf8()
        .expect("Reads json as string successfully")
        .to_string()
}
