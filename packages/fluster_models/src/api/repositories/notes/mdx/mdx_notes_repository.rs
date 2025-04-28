use crate::models::notes::mdx::mdx_note::MdxNoteRust;

use fluster_types::{
    traits::db_entity_repository::FlusterDbEntityRepository, typedefs::note_type_utils::FlusterDb,
};

pub struct MdxNotesRepository {
    pub table_name: String,
    pub db: FlusterDb,
}

impl<'a> MdxNotesRepository {
    pub async fn new(db: FlusterDb) -> MdxNotesRepository {
        db.use_db("mdx_notes").await;
        MdxNotesRepository {
            table_name: String::from("mdx_notes"),
            db,
        }
    }
}

impl FlusterDbEntityRepository<MdxNoteRust> for MdxNotesRepository {
    fn save_many(
        &self,
        items: Vec<MdxNoteRust>,
    ) -> Option<fluster_types::errors::database_errors::DatabaseError> {
        todo!()
    }
}
