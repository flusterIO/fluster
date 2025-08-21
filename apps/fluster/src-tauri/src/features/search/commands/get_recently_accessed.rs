use crate::{
    core::{
        database::db::get_database, types::errors::errors::FlusterResult,
        utils::date_utils::date_string_to_int,
    },
    features::mdx::{
        data::{mdx_note_entity::MdxNoteEntity, mdx_note_group::MdxNoteGroup},
        methods::mdx_note_models_to_mdx_note_groups::mdx_note_models_to_mdx_note_groups,
    },
};

/// For now this just returns all notes, unsorted since the dates can't be parsed on the rust side
/// for some inexplicable reason.
#[tauri::command]
#[specta::specta]
pub async fn get_recently_accessed_notes() -> FlusterResult<Vec<MdxNoteGroup>> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let models = MdxNoteEntity::get_all(&db).await?;
    mdx_note_models_to_mdx_note_groups(&db, models).await
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn gets_recently_accessed_notes() {
        let res = get_recently_accessed_notes().await;
        assert!(
            res.is_ok(),
            "Returns recently accessed notes without throwing an error."
        );
        // assert_eq!(result, 4);
    }
}
