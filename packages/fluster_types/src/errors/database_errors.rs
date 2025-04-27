use thiserror::Error;

#[derive(Debug, Error)]
pub enum DatabaseError {
    #[error("data store disconnected")]
    Disconnect(#[from] std::io::Error),

    #[error("Failed to connect to Fluster's database.")]
    FailToConnect,

    #[error("Failed to insert an item into the database.")]
    FailToCreateEntity,

    #[error("Failed to find entry.")]
    FailToFind,
}
