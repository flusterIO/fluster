use serde::{Deserialize, Serialize};
use specta::Type;
use strum::IntoEnumIterator;

use crate::core::{
    database::{db::get_database, tables::table_paths::DatabaseTables},
    types::FlusterDb,
};

#[derive(Type, Serialize, Deserialize, Clone)]
pub struct DesktopHealthReport {
    pub database_tables_exist: bool,
    /// This boolean describes the overall health of the desktop app. If any inidividual field
    /// that warrents re-initializing is false, this field will be false.
    pub healthy: bool,
}

pub async fn database_tables_exist(db: &FlusterDb<'_>) -> bool {
    if let Ok(table_names) = db.table_names().execute().await {
        let vec_string = DatabaseTables::Vector.to_string();
        DatabaseTables::iter()
            .filter(|x| x.to_string() != vec_string)
            .all(|x| table_names.contains(&x.to_string()))
    } else {
        false
    }
}

#[tauri::command]
#[specta::specta]
pub async fn get_desktop_health_report() -> DesktopHealthReport {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    // let tables = DatabaseTables::iter().all(|x| &db.open_table )
    let database_tables_exist = database_tables_exist(&db).await;
    DesktopHealthReport {
        database_tables_exist,
        // leaving this as an array so it can be expanded upon later.
        healthy: [database_tables_exist].iter().all(|x| *x),
    }
}
