use std::borrow::Cow;

#[derive(Debug, Clone)]
pub struct MdxParsingError<'a> {
    pub path: Cow<'a, str>,
}

#[derive(Debug)]
pub struct NoTitleError<'a> {
    pub path: Cow<'a, str>,
}

impl<'a> MdxParsingError {
    pub fn new(file_path: &'a str) -> Self {
        MdxParsingError { path: file_path }
    }
}

impl std::fmt::Display for MdxParsingError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> fmt::Result {
        write!(
            f,
            format!("Fluster failed to parse the mdx file at ${self.path}.")
        )
    }
}

impl NoTitleError {
    pub fn new(file_path: &'a str) -> Self {
        NoTitleError { path: file_path }
    }
}

impl std::fmt::Display for NoTitleError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> fmt::Result {
        write!(f, format!("Fluster did not find a title for the file at at ${self.path}, either in the front matter or as part of the mdx content."))
    }
}
