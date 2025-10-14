use tokio::{fs::File, io::AsyncReadExt};

use crate::core::types::errors::errors::{FlusterError, FlusterResult};

#[tauri::command]
#[specta::specta]
pub async fn load_binary_file(
    root_relative_path: String,
    base_path: String,
) -> FlusterResult<Vec<u8>> {
    let path = match root_relative_path.contains(&base_path) {
        true => std::path::Path::new(&root_relative_path),
        false => &std::path::Path::new(&base_path).join(root_relative_path),
    };

    if !path.exists() {
        return Err(FlusterError::FileDoesNotExist);
    }
    let mut file = File::open(path)
        .await
        .map_err(|_| FlusterError::FileDoesNotExist)?;

    let mut bytes: Vec<u8> = Vec::new();
    file.read_to_end(&mut bytes)
        .await
        .map_err(|_| FlusterError::FailToReadFile)?;

    Ok(bytes)
}
