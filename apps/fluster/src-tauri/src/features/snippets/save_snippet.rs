use sqlx::postgres::PgPoolOptions;

use crate::core::{
    db::{
        db::{get_database, get_database_uri},
        tables::table_paths::DatabaseTables,
        utils::{start_db, stop_db},
    },
    types::errors::errors::{FlusterError, FlusterResult},
};

use super::snippet_model::SnippetItem;

// FIXME: Tags are not currently being saved. Handle that here ace...

#[tauri::command]
#[specta::specta]
pub async fn save_snippet(item: SnippetItem, tags: Vec<String>) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let tbl = db
        .open_table(DatabaseTables::Snippets.to_string())
        .execute()
        .await
        .map_err(|_| FlusterError::FailToOpenTable)?;
    tbl.add(item).execute().await;
    Ok(())
}

#[cfg(test)]
mod tests {
    use tauri::test::mock_app;

    use crate::core::db::initialize_database::initialize_database;

    use super::*;

    #[tokio::test]
    async fn saves_snippet_successfully() {
        let s = SnippetItem {
            id: None,
            label: "test snippet".to_string(),
            body: "test snippet body".to_string(),
            desc: "My description for my test snippet.".to_string(),
            lang: "typescript".to_string(),
        };
        let app = mock_app();
        let handle = app.handle();
        initialize_database(handle).await;

        let res = save_snippet(s, Vec::new()).await;
        // println!("Res: {:?}", res.as_ref().err().unwrap());
        assert!(res.is_ok(), "Saves snippet without throwing an error.");
        // assert_eq!(result, 4);
    }

    #[tokio::test]
    async fn updates_snippet_successfully() {
        let label = "test snippet updated".to_string();
        let body = "test snippet body updated".to_string();
        let desc = "My description for my test snippet updated.".to_string();
        let lang = "python".to_string();
        let s = SnippetItem {
            id: Some(1),
            label: label.clone(),
            body: body.clone(),
            desc: desc.clone(),
            lang: lang.clone(),
        };
        let app = mock_app();
        let handle = app.handle();
        initialize_database(handle).await;

        let res = save_snippet(s, Vec::new()).await;
        // println!("Res: {:?}", res.as_ref().err().unwrap());
        assert!(res.is_ok(), "Saves snippet without throwing an error.");
        let data = res.unwrap();
        assert_eq!(data.body, body, "Updates body");
        assert_eq!(data.label, label, "Updates label");
        assert_eq!(data.desc, desc, "Updates desc");
        assert_eq!(data.lang, lang, "Updates lang");
        // assert_eq!(result, 4);
    }
}
