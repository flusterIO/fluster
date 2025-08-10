use crate::{
    core::{
        database::db::get_database, types::errors::errors::FlusterResult,
        utils::date_utils::date_string_to_int,
    },
    features::mdx::data::{mdx_note_entity::MdxNoteEntity, mdx_note_group::MdxNoteGroup},
};

#[tauri::command]
#[specta::specta]
pub async fn get_recently_accessed_notes() -> FlusterResult<Vec<MdxNoteGroup>> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    MdxNoteEntity::get_all(&db).await?.iter().for_each(|x| {
        println!("Last Read: {:?}", x.last_read);
        let d = date_string_to_int(&x.last_read);
        println!("DDDD: {:?}", d);
    });
    Ok(Vec::new())
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
