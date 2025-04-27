use crate::errors::database_errors;

pub trait FlusterDbEntityRepository<T> {
    fn save_many(&self, items: Vec<T>) -> Option<database_errors::DatabaseError>;
}
