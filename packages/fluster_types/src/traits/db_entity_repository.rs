use crate::errors::errors::FlusterError;

pub trait FlusterDbEntityRepository<T> {
    fn save_many(&self, items: Vec<T>) -> Option<FlusterError>;
}
