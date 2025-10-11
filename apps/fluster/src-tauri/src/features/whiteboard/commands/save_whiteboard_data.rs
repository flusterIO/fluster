use chrono::Utc;

use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::whiteboard::data::{
        whiteboard_constants::DEFAULT_WHITEBOARD_LABEL, whiteboard_entity::WhiteboardEntity,
        whiteboard_model::WhiteboardModel,
    },
};

#[tauri::command]
#[specta::specta]
pub async fn save_whiteboard_data(
    id: String,
    whiteboard_data: String,
    label: Option<String>,
) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;

    let now = Utc::now().timestamp_millis().to_string();

    let whiteboard_model = WhiteboardModel {
        id,
        label: match label {
            Some(l) => l,
            None => DEFAULT_WHITEBOARD_LABEL.to_string(),
        },
        state: whiteboard_data,
        // Have to do this half assed bulltshit because I still can't parse the date rust side.
        ctime: now.clone(),
        utime: now,
    };

    WhiteboardEntity::save_many(&db, vec![whiteboard_model]).await
}
