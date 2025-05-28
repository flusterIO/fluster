use crate::core::types::{errors::errors::FlusterResult, FlusterDb};

/// Useful utility to map error to FlusterError for use with the ? syntax.
pub async fn stop_db(db: &mut FlusterDb<'_>) -> FlusterResult<()> {
    db.stop()
        .await
        .map_err(|_| crate::core::types::errors::errors::FlusterError::FailToStopDb)
}

/// Useful utility to map error to FlusterError for use with the ? syntax.
pub async fn start_db(db: &mut FlusterDb<'_>) -> FlusterResult<()> {
    db.start()
        .await
        .map_err(|_| crate::core::types::errors::errors::FlusterError::FailToStartDb)
}
