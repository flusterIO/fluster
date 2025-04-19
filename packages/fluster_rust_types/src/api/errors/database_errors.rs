use thiserror::Error;

#[derive(Debug, Error)]
pub enum DatabaseError {
    #[error("data store disconnected")]
    Disconnect(#[from] std::io::Error),

    #[error("Failed to connect to Fluster's database.")]
    FailToConnect,

    #[error("Failed to create an item in Fluster's database. If this was not the result of a third party plugin, this is probably my fault. Please submit an issue on github.")]
    FailToCreateAsset,
}
