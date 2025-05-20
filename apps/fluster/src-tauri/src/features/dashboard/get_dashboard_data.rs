use diesel::{
    query_dsl::methods::{FilterDsl, LimitDsl},
    ExpressionMethods, QueryDsl, RunQueryDsl,
};
use serde::{Deserialize, Serialize};
use specta::Type;

use crate::core::db::{
    db::{get_database_connection, get_pg_embed},
    entities::mdx_note::mdx_note_summary::MdxNoteSummary,
};

#[derive(Debug, Deserialize, Serialize, Type)]
pub struct DashboardData {
    notes: Vec<MdxNoteSummary>,
}

impl Default for DashboardData {
    fn default() -> Self {
        Self {
            notes: Vec::<MdxNoteSummary>::new(),
        }
    }
}

#[tauri::command]
#[specta::specta]
pub async fn get_dashboard_data() -> DashboardData {
    use crate::core::db::generated::main_schema::mdx_note::dsl::*;
    let data = DashboardData::default();
    // if let Ok(db) = get_pg_embed().await {
    //     if let Ok(mut conn) = get_database_connection(&db).await {
    //         let n = mdx_note.order_by(atime.desc()).get_results(&conn);
    //     } else {
    //         log::error!("Failed to load database connection.");
    //     }
    // }
    data
}
