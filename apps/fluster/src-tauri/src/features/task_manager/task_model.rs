pub struct TaskModel {
    pub id: String,
    pub label: String,
    /// notes can be any mdx string.
    pub notes: String,
    pub flags: Vec<String>,
}
