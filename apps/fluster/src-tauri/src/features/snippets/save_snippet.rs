use sqlx::postgres::PgPoolOptions;

use crate::core::{
    db::{db::get_database, utils::stop_db},
    types::errors::errors::{FlusterError, FlusterResult},
};

use super::snippet_model::SnippetItem;

#[tauri::command]
#[specta::specta]
pub async fn save_snippet(item: SnippetItem) -> FlusterResult<()> {
    let db_res = get_database().await;
    let mut db = db_res.lock().await;
    let uri = db.full_db_uri("fluster");
    let start_res = db.start_db().await;
    if start_res.is_err() {
        println!("Error while starting database: {:?}", start_res.err());
    }
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&uri)
        .await
        .map_err(|_| FlusterError::FailToConnect)?;
    if item.id.is_some() {
    } else {
        // RESUME: Come back here and start working with this in the database. Once this is handled, move
        // to the equations and tags before going on to the sync method.
        let res = sqlx::query!(
            r#"INSERT INTO snippet (label, description, lang, body)
            VALUES($1, $2, $3, $4)"#,
            item.label,
            item.desc,
            item.lang,
            item.body
        )
        .execute(&pool)
        .await;
        if res.is_ok() {
            let item = res.unwrap();
            println!("Item res: {:?}", item);
            stop_db(&mut db).await?;
            if item.rows_affected() == 1 {
                return Ok(());
            }
        } else {
            return Err(FlusterError::FailToCreateEntity);
        }
    }
    Err(FlusterError::FailToConnect)
}

#[cfg(test)]
mod tests {
    use tauri::{ipc::Channel, test::mock_app, AppHandle};

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

        let res = save_snippet(s).await;
        // println!("Res: {:?}", res.as_ref().err().unwrap());
        assert!(res.is_ok(), "Saves snippet without throwing an error.");
        // assert_eq!(result, 4);
    }
}
