use crate::typedefs::note_type_utils::FlusterDb;

#[allow(async_fn_in_trait)]
pub trait FlusterDatabaseEntity<T> {
    async fn save(&self, db: FlusterDb) -> Option<crate::errors::database_errors::DatabaseError>;

    fn get_id(&self) -> String;
}
