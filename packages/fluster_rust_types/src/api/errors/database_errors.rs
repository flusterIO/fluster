use thiserror::Error;

#[derive(Debug, Error)]
pub enum DatabaseError {
    #[error("data store disconnected")]
    Disconnect(#[from] std::io::Error),

    #[error("Failed to connect to Fluster's database.")]
    FailToConnect,
}
