use include_dir::{include_dir, Dir};

use crate::core::{
    database::db::get_data_dir,
    types::errors::errors::{FlusterError, FlusterResult},
};

pub static MATHJAX: Dir = include_dir!("$FLUSTER_NATIVE_ROOT/node_modules/mathjax-full/es5");

/// Copies mathjax directory to the user's machine, making it available to front end even while
/// offline.
#[tauri::command]
#[specta::specta]
pub async fn copy_mathjax() -> FlusterResult<()> {
    let data_dir = get_data_dir()?.join("mathjax");
    if std::fs::exists(&data_dir).is_ok_and(|x| x) {
        Ok(())
    } else {
        MATHJAX
            .extract(&data_dir)
            .map_err(|_| FlusterError::FailToConnect)?;
        Ok(())
    }
}
