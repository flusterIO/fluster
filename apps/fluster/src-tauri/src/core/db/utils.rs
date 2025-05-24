use crate::core::types::{errors::errors::FlusterResult, FlusterDb};

pub async fn stop_db(db: &mut FlusterDb<'_>) -> FlusterResult<()> {
    db.stop_db()
        .await
        .map_err(|_| crate::core::types::errors::errors::FlusterError::FailToStopDb)
}

pub async fn start_db(db: &mut FlusterDb<'_>) -> FlusterResult<()> {
    db.start_db()
        .await
        .map_err(|_| crate::core::types::errors::errors::FlusterError::FailToStartDb)
}
