use std::path::Path;

use include_dir::{include_dir, Dir};

use crate::core::types::errors::errors::{FlusterError, FlusterResult};

pub static MATHJAX: Dir = include_dir!("$FLUSTER_NATIVE_ROOT/node_modules/mathjax-full/es5");

#[tauri::command]
#[specta::specta]
pub async fn read_mathjax(sub_path: String) -> FlusterResult<String> {
    println!("Sub Path: {:?}", sub_path);
    Ok("".to_string())
    // let base_path = get_data_dir()
    //     .unwrap()
    //     .join("mathjax")
    //     .join("data")
    //     .join("tex-chtml.js");
    // // let _path = Path::new(p.main_path);
    // println!("Absolute path: {:?}", base_path);
    // tokio::fs::read_to_string(base_path)
    //     .await
    //     .map_err(|_| FlusterError::FailToReadMathjaxFont)
}

#[tauri::command]
#[specta::specta]
pub async fn read_mathjax_font_file(sub_path: String) -> FlusterResult<String> {
    println!("Subpath: {:?}", sub_path);
    let dir_path = Path::new("output")
        .join("chtml")
        .join("fonts")
        .join("woff-v2")
        .join(sub_path);
    tokio::fs::read_to_string(dir_path)
        .await
        .map_err(|_| FlusterError::FailToReadMathjaxFont)
}
