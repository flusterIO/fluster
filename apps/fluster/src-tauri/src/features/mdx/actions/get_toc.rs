use serde::{Deserialize, Serialize};
use specta::Type;

use crate::core::types::errors::errors::{FlusterError, FlusterResult};

#[derive(Serialize, Deserialize, Type)]
pub struct TocEntry {
    pub depth: u8,
    pub body: String,
}

#[tauri::command]
#[specta::specta]
pub async fn get_toc_from_markdown(markdown_content: String) -> FlusterResult<Vec<TocEntry>> {
    let mut entries: Vec<TocEntry> = Vec::new();
    markdown_content.lines().for_each(|l| {
        if l.starts_with("###### ") {
            entries.push(TocEntry {
                depth: 6,
                body: l.replace("###### ", ""),
            })
        } else if l.starts_with("##### ") {
            entries.push(TocEntry {
                depth: 5,
                body: l.replace("##### ", ""),
            })
        } else if l.starts_with("#### ") {
            entries.push(TocEntry {
                depth: 4,
                body: l.replace("#### ", ""),
            })
        } else if l.starts_with("### ") {
            entries.push(TocEntry {
                depth: 3,
                body: l.replace("### ", ""),
            })
        } else if l.starts_with("## ") {
            entries.push(TocEntry {
                depth: 2,
                body: l.replace("## ", ""),
            })
        } else if l.starts_with("# ") {
            entries.push(TocEntry {
                depth: 1,
                body: l.replace("# ", ""),
            })
        }
    });
    Ok(entries)
}

#[tauri::command]
#[specta::specta]
pub async fn get_toc_from_fs_path(fs_path: String) -> FlusterResult<Vec<TocEntry>> {
    let data = tokio::fs::read_to_string(fs_path.clone())
        .await
        .map_err(|e| {
            println!("Error: {:?}", e);
            FlusterError::FailToReadFileSystemPath(fs_path)
        })?;
    get_toc_from_markdown(data).await
}
