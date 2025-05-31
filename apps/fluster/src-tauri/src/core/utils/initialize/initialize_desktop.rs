use crate::{
    core::types::errors::errors::FlusterResult, features::math::copy_mathjax_dir::copy_mathjax,
};

use super::initialize_database::initialize_database;

#[tauri::command]
#[specta::specta]
pub async fn initialize_desktop() -> FlusterResult<()> {
    copy_mathjax().await?;
    initialize_database().await?;
    Ok(())
}
