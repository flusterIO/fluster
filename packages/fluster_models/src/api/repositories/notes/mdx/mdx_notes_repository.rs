use std::sync::LazyLock;

use crate::models::notes::mdx::mdx_note::MdxNoteRust;

use fluster_types::{
    traits::db_entity_repository::FlusterDbEntityRepository, typedefs::note_type_utils::FlusterDb,
};
use surrealdb::{engine::remote::ws::Client, Surreal};

// type DbType =
//     ;

pub struct MdxNotesRepository<'a> {
    pub table_name: String,
    pub db: &'a LazyLock<Surreal<Client>>,
}

impl<'a> MdxNotesRepository<'a> {
    pub async fn new(db: FlusterDb<'a>) -> MdxNotesRepository<'a> {
        db.use_db("mdx_notes").await;
        MdxNotesRepository {
            table_name: String::from("mdx_notes"),
            db,
        }
    }
}

impl FlusterDbEntityRepository<MdxNoteRust> for MdxNotesRepository<'_> {
    fn save_many(
        &self,
        items: Vec<MdxNoteRust>,
    ) -> Option<fluster_types::errors::database_errors::DatabaseError> {
        todo!()
    }
}
