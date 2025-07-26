use kalosm::{language::Bert, sound::ModelLoadingProgress};
use tauri::{AppHandle, Emitter};

use crate::core::events::event_keys::GlobalCrossLanguageFlusterEvents;

use super::begin_language_model_download::DownloadingStatus;

#[tauri::command]
#[specta::specta]
pub async fn begin_embedding_model_download(app: AppHandle) {
    let _ = Bert::builder()
        .build_with_loading_handler(move |progress| match progress {
            ModelLoadingProgress::Downloading {
                source: _,
                progress,
            } => {
                let _ = app.emit(
                    &GlobalCrossLanguageFlusterEvents::EmbeddingModelDownloadProgress.to_string(),
                    DownloadingStatus {
                        portion: progress.progress,
                        elapsed_time: progress.start_time.elapsed().as_secs_f32(),
                    },
                );
            }
            ModelLoadingProgress::Loading { progress } => {
                println!("Loading embedding model: {:?}", progress);
            }
        })
        .await;
}
