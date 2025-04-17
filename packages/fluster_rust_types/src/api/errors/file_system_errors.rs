#[derive(Debug, Clone)]
pub struct PathNotFoundError<'a> {
    pub path: &'a str,
}

impl<'a> PathNotFoundError<'a> {
    pub fn new(file_path: &'a str) -> Self {
        PathNotFoundError { path: file_path }
    }
}

impl std::fmt::Display for PathNotFoundError<'_> {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "Could not locate file {}", self.path)
    }
}
