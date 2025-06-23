#[derive(Debug, Clone)]
pub struct ParsedContentResult<T> {
    pub new_content: String,
    pub results: Vec<T>,
}
