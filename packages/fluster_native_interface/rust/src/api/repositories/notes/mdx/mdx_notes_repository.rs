use crate::api::models::notes::mdx::mdx_note::MdxNoteEntity;

use fluster_types::{
    errors::errors::FlusterError, traits::db_entity_repository::FlusterDbEntityRepository,
    typedefs::note_type_utils::FlusterDb,
};

pub struct MdxNotesRepository<'a> {
    pub table_name: String,
    pub db: &'a FlusterDb,
}

impl<'a> MdxNotesRepository<'a> {
    pub async fn new(db: &'a FlusterDb) -> MdxNotesRepository<'a> {
        db.use_db("mdx_notes").await;
        MdxNotesRepository {
            table_name: String::from("mdx_notes"),
            db,
        }
    }
}

impl<'a> FlusterDbEntityRepository<MdxNoteEntity> for MdxNotesRepository<'a> {
    fn save_many(&self, items: Vec<MdxNoteEntity>) -> Option<FlusterError> {
        todo!()
    }
}
