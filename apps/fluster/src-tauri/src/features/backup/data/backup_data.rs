use crate::core::types::{errors::errors::FlusterResult, FlusterDb};

pub trait BackupData {
    fn version(&self) -> i16;
    async fn generate(&mut self, db: &FlusterDb<'_>) -> FlusterResult<()>;
}
