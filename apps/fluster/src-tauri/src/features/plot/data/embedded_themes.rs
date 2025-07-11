use include_dir::{include_dir, Dir};

use super::plotly_theme_names::PlotlyTheme;

static EMBEDDED_PLOTLY_THEMES: Dir =
    include_dir!("$CARGO_MANIFEST_DIR/src/features/plot/data/theme_data");

pub async fn read_plotly_theme(theme: PlotlyTheme) -> String {
    let _p = match theme {
        PlotlyTheme::None => "none.json",
        PlotlyTheme::Ggplot2 => "ggplot2.json",
        PlotlyTheme::Seaborn => "seaborn.json",
        PlotlyTheme::SimpleWhite => "simply_white.json",
        PlotlyTheme::Plotly => "plotly.json",
        PlotlyTheme::PlotlyWhite => "plotly_white.json",
        PlotlyTheme::PlotlyDark => "plotly_dark.json",
        PlotlyTheme::Presentation => "presentation.json",
        PlotlyTheme::Xgridoff => "xgridoff.json",
        PlotlyTheme::Ygridoff => "ygridoff.json",
        PlotlyTheme::Gridon => "gridon.json",
    };
    let res = EMBEDDED_PLOTLY_THEMES
        .get_file(_p)
        .expect("Reads plotly theme successfully.");
    println!("Here");
    res.contents_utf8()
        .expect("Reads json as string successfully")
        .to_string()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn reads_plotly_theme() {
        let res = read_plotly_theme(PlotlyTheme::Plotly).await;
        println!("Res: {}", res);
        assert!(!res.is_empty(), "Returns a non-empty string.");
        // assert_eq!(result, 4);
    }
}
