use serde::{Deserialize, Serialize};
use specta::Type;
use strum::IntoEnumIterator;

use crate::{
    core::{
        database::{db::get_database, tables::table_paths::DatabaseTables},
        types::FlusterDb,
    },
    features::math::get_mathjax_path::get_mathjax_path,
};

#[derive(Type, Serialize, Deserialize, Clone)]
pub struct DesktopHealthReport {
    pub database_tables_exist: bool,
    pub mathjax_dir_exists: bool,
    /// This boolean describes the overall health of the desktop app. If any inidividual field
    /// that warrents re-initializing is false, this field will be false.
    pub healthy: bool,
}

pub async fn database_tables_exist(db: &FlusterDb<'_>) -> bool {
    let table_names = db.table_names().execute().await;
    if table_names.is_err() {
        false
    } else {
        let d = table_names.unwrap();
        DatabaseTables::iter().all(|x| d.contains(&x.to_string()))
    }
}

#[tauri::command]
#[specta::specta]
pub async fn get_desktop_health_report() -> DesktopHealthReport {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    // let tables = DatabaseTables::iter().all(|x| &db.open_table )
    let database_tables_exist = database_tables_exist(&db).await;
    let mathjax_dir_exists = std::fs::exists(get_mathjax_path()).is_ok_and(|x| x);
    DesktopHealthReport {
        database_tables_exist,
        mathjax_dir_exists,
        healthy: vec![database_tables_exist, mathjax_dir_exists]
            .iter()
            .all(|x| *x),
    }
}
