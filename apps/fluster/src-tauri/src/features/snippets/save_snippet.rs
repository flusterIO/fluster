use crate::core::{
    db::{db::get_database, tables::table_paths::DatabaseTables},
    types::errors::errors::{FlusterError, FlusterResult},
};

use super::{snippet_entity::SnippetEntity, snippet_model::SnippetModel};

/// Note that the values are all in array's and that tags is a 2d array. This is so that for each
/// index in the snippets array, there is an array at that index in the tags array with the tags
/// the snippet at that index contains.
/// While it's weird to think about a database's data in this way, this very similar to how pandas and
/// polars handle their data.
#[tauri::command]
#[specta::specta]
pub async fn save_snippets(items: Vec<SnippetModel>, tags: Vec<Vec<String>>) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let tbl = db
        .open_table(DatabaseTables::Snippets.to_string())
        .execute()
        .await
        .map_err(|_| FlusterError::FailToOpenTable)?;
    let tbl_manager = SnippetEntity {};
    tbl_manager.save_many(items, db).await?;
    Ok(())
}

#[cfg(test)]
mod tests {
    use tauri::test::mock_app;

    use crate::core::db::initialize_database::initialize_database;

    use super::*;

    fn get_test_snippet() -> SnippetModel {
        SnippetModel::new_now(
            "test snippet".to_string(),
            "test snippet body".to_string(),
            "typescript".to_string(),
            Some("My description for my test snippet.".to_string()),
        )
    }

    #[tokio::test]
    async fn saves_snippet_successfully() {
        let s = get_test_snippet();
        let app = mock_app();

        let handle = app.handle();
        initialize_database(handle).await;

        let res = save_snippets(vec![s], Vec::new()).await;
        // println!("Res: {:?}", res.as_ref().err().unwrap());
        assert!(res.is_ok(), "Saves snippet without throwing an error.");
        // assert_eq!(result, 4);
    }

    #[tokio::test]
    async fn updates_snippet_successfully() {
        let s = get_test_snippet();
        let app = mock_app();
        let handle = app.handle();
        initialize_database(handle).await;

        let res = save_snippets(vec![s], Vec::new()).await;
        // println!("Res: {:?}", res.as_ref().err().unwrap());
        assert!(res.is_ok(), "Saves snippet without throwing an error.");
    }
}
