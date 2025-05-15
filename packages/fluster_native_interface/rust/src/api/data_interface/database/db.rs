use diesel_async::{AsyncConnection, AsyncPgConnection};
pub use fluster_types::errors::errors::FlusterError;
use fluster_types::errors::errors::FlusterResult;

/// flutter_rust_bridge:ignore
pub async fn get_database_connection() -> FlusterResult<AsyncPgConnection> {
    if let Ok(env_var) = &std::env::var("crate::api::data_interface::database_URI") {
        if let Ok(res) = AsyncPgConnection::establish(env_var).await {
            Ok(res)
        } else {
            Err(FlusterError::FailToConnect)
        }
    } else {
        Err(FlusterError::FailToConnect)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn database_returns_healthy_report() {
        let db = get_database_connection().await;
        assert!(db.is_ok(), "Database does not return an error.");
        // assert_eq!(result, 4);
    }
}
