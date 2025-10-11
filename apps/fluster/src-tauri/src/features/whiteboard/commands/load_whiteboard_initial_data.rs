use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::whiteboard::data::{
        whiteboard_entity::WhiteboardEntity, whiteboard_model::WhiteboardModel,
    },
};

#[tauri::command]
#[specta::specta]
pub async fn load_whiteboard_initial_data(id: String) -> FlusterResult<Option<WhiteboardModel>> {
    let db_res = get_database().await;
    let db = db_res.lock().await;

    WhiteboardEntity::get_by_id(&db, id).await
}
