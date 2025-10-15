pub enum ValidTabularFileExtensions {
    Csv,
}

impl ValidTabularFileExtensions {
    fn as_str(&self) -> &'static str {
        match self {
            ValidTabularFileExtensions::Csv => "csv",
        }
    }
}
