use crate::typedefs::note_type_utils::FlusterDb;

#[allow(async_fn_in_trait)]
pub trait FlusterDatabaseEntity<T> {
    async fn save(&self, db: &FlusterDb) -> Option<crate::errors::errors::FlusterError>;
    async fn from_id_string(
        id: &str,
        db: &FlusterDb,
    ) -> Result<T, crate::errors::errors::FlusterError>;

    fn get_id(&self) -> String;
}
