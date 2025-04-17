#[derive(Debug, thiserror::Error)]
pub enum ParsingError {
    #[error("Failed to parse the mdx content at `{0}`.")]
    MdxParsingError(String),
    #[error("Fluster was unable to find a title for the note at `{0}`.")]
    NoTitleError(String),
}
