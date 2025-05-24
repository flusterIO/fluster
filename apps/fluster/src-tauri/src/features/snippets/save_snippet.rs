use sqlx::postgres::PgPoolOptions;

use crate::core::{
    db::db::get_database,
    types::{
        errors::errors::{FlusterError, FlusterResult},
        traits::db_entity::DbRecord,
    },
};

use super::snippet_model::SnippetItem;

#[tauri::command]
#[specta::specta]
pub async fn save_snippet(item: SnippetItem) -> FlusterResult<DbRecord> {
    let db_res = get_database().await;
    let mut db = db_res.lock().await;
    let uri = db.full_db_uri("fluster");
    let start_res = db.start_db().await;
    if start_res.is_err() {
        println!("Error: {:?}", start_res.err());
    }
    let pool = PgPoolOptions::new().max_connections(5).connect(&uri).await;
    if item.id.is_some() {
    } else {
        // RESUME: Come back here and start working with this in the database. Once this is handled, move
        // to the equations and tags before going on to the sync method.
        // let res = sqlx::query!(
        //     r#"INSERT INTO snippet (label, description, lang, body)
        //     VALUES($1, $2, $3, $4)"#,
        //     item.label,
        //     item.desc,
        //     item.lang,
        //     item.body
        // )
        // .execute(&pool)
        // .await;
        // log::info!("{:?}", res);
        // if res.is_ok() {
        //     let item = res.unwrap();
        //     log::info!("Item: {:?}", item);
        //     return Ok(DbRecord { id: 1 });
        // } else {
        //     return Err(FlusterError::FailToCreateEntity);
        // }
    }
    Ok(DbRecord { id: 1 })
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
            lang: "".to_string(),
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
