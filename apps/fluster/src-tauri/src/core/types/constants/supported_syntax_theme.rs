use serde::{Deserialize, Serialize};
use sqlx::prelude::Type;

/** Themes generated from shiki. This will not be implemented by the datbaase package as this is
 * only used as part of the settings object which is serialized as json before being saved tothe
 * DB*/
#[derive(Debug, Serialize, Deserialize, Clone, Default, Type)]
pub enum SupportedSyntaxTheme {
    #[serde(rename(serialize = "andromeeda", deserialize = "andromeeda"))]
    Andromeeda,
    #[serde(rename(serialize = "aurora-x", deserialize = "aurora-x"))]
    AuroraX,
    #[serde(rename(serialize = "ayu-dark", deserialize = "ayu-dark"))]
    AyuDark,
    #[serde(rename(serialize = "catppuccin-frappe", deserialize = "catppuccin-frappe"))]
    CatppuccinFrappe,
    #[serde(rename(serialize = "catppuccin-latte", deserialize = "catppuccin-latte"))]
    CatppuccinLatte,
    #[serde(rename(
        serialize = "catppuccin-macchiato",
        deserialize = "catppuccin-macchiato"
    ))]
    CatppuccinMacchiato,
    #[serde(rename(serialize = "catppuccin-mocha", deserialize = "catppuccin-mocha"))]
    CatppuccinMocha,
    #[serde(rename(serialize = "dark-plus", deserialize = "dark-plus"))]
    DarkPlus,
    #[serde(rename(serialize = "dracula", deserialize = "dracula"))]
    #[default]
    Dracula,
    #[serde(rename(serialize = "dracula-soft", deserialize = "dracula-soft"))]
    DraculaSoft,
    #[serde(rename(serialize = "everforest-dark", deserialize = "everforest-dark"))]
    EverforestDark,
    #[serde(rename(serialize = "everforest-light", deserialize = "everforest-light"))]
    EverforestLight,
    #[serde(rename(serialize = "github-dark", deserialize = "github-dark"))]
    GithubDark,
    #[serde(rename(serialize = "github-dark-default", deserialize = "github-dark-default"))]
    GithubDarkDefault,
    #[serde(rename(serialize = "github-dark-dimmed", deserialize = "github-dark-dimmed"))]
    GithubDarkDimmed,
    #[serde(rename(
        serialize = "github-dark-high-contrast",
        deserialize = "github-dark-high-contrast"
    ))]
    GithubDarkHighContrast,
    #[serde(rename(serialize = "github-light", deserialize = "github-light"))]
    GithubLight,
    #[serde(rename(
        serialize = "github-light-default",
        deserialize = "github-light-default"
    ))]
    GithubLightDefault,
    #[serde(rename(
        serialize = "github-light-high-contrast",
        deserialize = "github-light-high-contrast"
    ))]
    GithubLightHighContrast,
    #[serde(rename(serialize = "gruvbox-dark-hard", deserialize = "gruvbox-dark-hard"))]
    GruvboxDarkHard,
    #[serde(rename(serialize = "gruvbox-dark-medium", deserialize = "gruvbox-dark-medium"))]
    GruvboxDarkMedium,
    #[serde(rename(serialize = "gruvbox-dark-soft", deserialize = "gruvbox-dark-soft"))]
    GruvboxDarkSoft,
    #[serde(rename(serialize = "gruvbox-light-hard", deserialize = "gruvbox-light-hard"))]
    GruvboxLightHard,
    #[serde(rename(
        serialize = "gruvbox-light-medium",
        deserialize = "gruvbox-light-medium"
    ))]
    GruvboxLightMedium,
    #[serde(rename(serialize = "gruvbox-light-soft", deserialize = "gruvbox-light-soft"))]
    GruvboxLightSoft,
    #[serde(rename(serialize = "houston", deserialize = "houston"))]
    Houston,
    #[serde(rename(serialize = "kanagawa-dragon", deserialize = "kanagawa-dragon"))]
    KanagawaDragon,
    #[serde(rename(serialize = "kanagawa-lotus", deserialize = "kanagawa-lotus"))]
    KanagawaLotus,
    #[serde(rename(serialize = "kanagawa-wave", deserialize = "kanagawa-wave"))]
    KanagawaWave,
    #[serde(rename(serialize = "laserwave", deserialize = "laserwave"))]
    Laserwave,
    #[serde(rename(serialize = "light-plus", deserialize = "light-plus"))]
    LightPlus,
    #[serde(rename(serialize = "material-theme", deserialize = "material-theme"))]
    MaterialTheme,
    #[serde(rename(
        serialize = "material-theme-darker",
        deserialize = "material-theme-darker"
    ))]
    MaterialThemeDarker,
    #[serde(rename(
        serialize = "material-theme-lighter",
        deserialize = "material-theme-lighter"
    ))]
    MaterialThemeLighter,
    #[serde(rename(
        serialize = "material-theme-ocean",
        deserialize = "material-theme-ocean"
    ))]
    MaterialThemeOcean,
    #[serde(rename(
        serialize = "material-theme-palenight",
        deserialize = "material-theme-palenight"
    ))]
    MaterialThemePalenight,
    #[serde(rename(serialize = "min-dark", deserialize = "min-dark"))]
    MinDark,
    #[serde(rename(serialize = "min-light", deserialize = "min-light"))]
    MinLight,
    #[serde(rename(serialize = "monokai", deserialize = "monokai"))]
    Monokai,
    #[serde(rename(serialize = "night-owl", deserialize = "night-owl"))]
    NightOwl,
    #[serde(rename(serialize = "nord", deserialize = "nord"))]
    Nord,
    #[serde(rename(serialize = "one-dark-pro", deserialize = "one-dark-pro"))]
    OneDarkPro,
    #[serde(rename(serialize = "one-light", deserialize = "one-light"))]
    OneLight,
    #[serde(rename(serialize = "plastic", deserialize = "plastic"))]
    Plastic,
    #[serde(rename(serialize = "poimandres", deserialize = "poimandres"))]
    Poimandres,
    #[serde(rename(serialize = "red", deserialize = "red"))]
    Red,
    #[serde(rename(serialize = "rose-pine", deserialize = "rose-pine"))]
    RosePine,
    #[serde(rename(serialize = "rose-pine-dawn", deserialize = "rose-pine-dawn"))]
    RosePineDawn,
    #[serde(rename(serialize = "rose-pine-moon", deserialize = "rose-pine-moon"))]
    RosePineMoon,
    #[serde(rename(serialize = "slack-dark", deserialize = "slack-dark"))]
    SlackDark,
    #[serde(rename(serialize = "slack-ochin", deserialize = "slack-ochin"))]
    SlackOchin,
    #[serde(rename(serialize = "snazzy-light", deserialize = "snazzy-light"))]
    SnazzyLight,
    #[serde(rename(serialize = "solarized-dark", deserialize = "solarized-dark"))]
    SolarizedDark,
    #[serde(rename(serialize = "solarized-light", deserialize = "solarized-light"))]
    SolarizedLight,
    #[serde(rename(serialize = "synthwave-84", deserialize = "synthwave-84"))]
    Synthwave84,
    #[serde(rename(serialize = "tokyo-night", deserialize = "tokyo-night"))]
    TokyoNight,
    #[serde(rename(serialize = "vesper", deserialize = "vesper"))]
    Vesper,
    #[serde(rename(serialize = "vitesse-black", deserialize = "vitesse-black"))]
    VitesseBlack,
    #[serde(rename(serialize = "vitesse-dark", deserialize = "vitesse-dark"))]
    VitesseDark,
    #[serde(rename(serialize = "vitesse-light", deserialize = "vitesse-light"))]
    VitesseLight,
}
