use serde::{Deserialize, Serialize};
use strum_macros::Display;

#[derive(specta::Type, Serialize, Deserialize, Display, PartialEq, Eq, Clone)]
pub enum PlotlyTheme {
    #[serde(rename = "ggplot2")]
    Ggplot2,
    #[serde(rename = "seaborn")]
    Seaborn,
    #[serde(rename = "simple_white")]
    SimpleWhite,
    #[serde(rename = "plotly")]
    Plotly,
    #[serde(rename = "plotly_white")]
    PlotlyWhite,
    #[serde(rename = "plotly_dark")]
    PlotlyDark,
    #[serde(rename = "presentation")]
    Presentation,
    #[serde(rename = "xgridoff")]
    Xgridoff,
    #[serde(rename = "ygridoff")]
    Ygridoff,
    #[serde(rename = "gridon")]
    Gridon,
    #[serde(rename = "none")]
    None,
}

