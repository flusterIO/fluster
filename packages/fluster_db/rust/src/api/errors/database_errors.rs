#[derive(Debug, Clone)]
pub struct DatabaseError<'a> {
    pub msg: &'a str,
}

impl<'a> DatabaseError<'a> {
    pub fn new(file_path: &'a str) -> Self {
        DatabaseError { path: file_path }
    }
}

impl std::fmt::Display for DatabaseError<'_> {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "Could not locate file {}", self.path)
    }
}
