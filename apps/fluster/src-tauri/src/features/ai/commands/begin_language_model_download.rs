use kalosm::{language::Llama, sound::ModelLoadingProgress};
use serde::{Deserialize, Serialize};
use tauri::{AppHandle, Emitter};

use crate::core::events::event_keys::CrossLanguageEvents;

#[derive(Serialize, Deserialize, Clone, specta::Type)]
#[serde(rename_all = "camelCase")]
pub struct DownloadingStatus {
    /// The proportion of the app downloaded, between 0 and 1.
    pub portion: u64,
    /// The elapsed time in seconds.
    pub elapsed_time: f32,
}

#[tauri::command]
#[specta::specta]
pub async fn begin_language_model_download(app: AppHandle) {
    let _ = Llama::builder()
        .build_with_loading_handler(move |progress| match progress {
            ModelLoadingProgress::Downloading {
                source: _,
                progress,
            } => {
                let _ = app.emit(
                    &CrossLanguageEvents::LanguageModelDownloadProgress.to_string(),
                    DownloadingStatus {
                        portion: progress.progress,
                        elapsed_time: progress.start_time.elapsed().as_secs_f32(),
                    },
                );
            }
            ModelLoadingProgress::Loading { progress } => {
                println!("Loading LLM: {:?}", progress);
            }
        })
        .await;
}
