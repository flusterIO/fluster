import plotly.io as pio
import plotly.graph_objects as go
import os
from pathlib import Path
import json


root = os.environ["FLUSTER_NATIVE_ROOT"]
if root is None:
    print("No FLUSTER_NATIVE_ROOT variable found. Cannot continue.")
    exit(1)

enum_string = """use serde::{{Deserialize, Serialize}};
use strum_macros::Display;

#[derive(specta::Type, Serialize, Deserialize, Display)]
pub enum PlotlyTheme {{
"""


def formatEnumKey(val: str) -> str:
    words = val.split("_")
    capitalized_words = []
    for w in words:
        capitalized_words.append(w.capitalize())
    return "".join(capitalized_words)


def handleTheme(theme_name):
    global enum_string
    plotly_template = pio.templates[theme_name]

    dummy_fig = go.Figure()
    dummy_fig.update_layout(template=plotly_template)
    fig_dict = dummy_fig.to_dict()
    layout_dict = fig_dict["layout"]
    json_data = json.dumps(layout_dict, indent=2)
    if json_data is None:
        print(f"No json returned from plotly for theme {theme_name}")
        exit(1)

    file_path = (
        Path(root)
        / "apps"
        / "fluster"
        / "src-tauri"
        / "src"
        / "features"
        / "plot"
        / "data"
        / "theme_data"
        / f"{theme_name}.json"
    )
    file_path.write_text(json_data)
    enum_string += (
        f'    #[serde(rename = "{theme_name}" )]\n    { formatEnumKey(theme_name)},\n'
    )


for name in pio.templates.items():
    handleTheme(name[0])

p = (
    Path(root)
    / "apps"
    / "fluster"
    / "src-tauri"
    / "src"
    / "features"
    / "plot"
    / "data"
    / "plotly_theme_names.rs"
)

enum_string += "}"

print(enum_string)

p.write_text(enum_string)
