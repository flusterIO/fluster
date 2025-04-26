// use fluster_rust_types::database_errors;
use gray_matter::{engine::YAML, Matter};
use serde::Serialize;
use std::path::PathBuf;

use crate::{models::notes::front_matter::front_matter_model::FrontMatter, parsing_errors};

#[derive(Serialize, Debug, Clone)]
pub struct MdxNoteRust {
    pub front_matter: FrontMatter,
    /// raw_body is equivalent to the raw file content with the front matter removed.
    pub raw_body: String,
    /// File path relative to the user's root notes directory.
    pub file_path: String,
}

impl MdxNoteRust {
    pub fn from_raw_mdx_string(
        raw_file_content: String,
        file_path: Option<&str>,
    ) -> Result<MdxNoteRust, parsing_errors::ParsingError> {
        let matter = Matter::<YAML>::new();
        let result = matter.parse_with_struct::<FrontMatter>(&raw_file_content);
        let fp = file_path.unwrap_or("Unknown");
        if result.is_none() {
            Err(parsing_errors::ParsingError::MdxParsingError(fp.to_owned()))
        } else {
            let parsed = result.unwrap();
            Ok(MdxNoteRust {
                front_matter: parsed.data,
                raw_body: parsed.content,
                file_path: fp.to_owned(),
            })
        }
    }
    /// All paths must be validated to ensure that they exist **before** pasing them into this
    /// function.
    pub fn from_file_system_path(
        file_path: &str,
    ) -> Result<MdxNoteRust, parsing_errors::ParsingError> {
        let raw_file_content = std::fs::read_to_string(file_path);
        if let Ok(content) = raw_file_content {
            MdxNoteRust::from_raw_mdx_string(content, Some(file_path))
        } else {
            Err(parsing_errors::ParsingError::MdxParsingError(
                file_path.to_owned(),
            ))
        }
    }
}

#[cfg(test)]
mod tests {
    use std::path;

    use super::*;

    // #[test]
    // fn mdx_note_parses() {
    //     let root = fluster_test_utils::test_utils::get_development_root_or_die();
    //     let test_content_path = path::Path::new(&root)
    //         .join("packages")
    //         .join("fluster_test_utils")
    //         .join("src")
    //         .join("api")
    //         .join("test_content")
    //         .join("test_mdx_content.mdx");
    //     let note = MdxNoteRust::from_file_system_path(&test_content_path);
    //     if note.is_err() {
    //         println!("Note: {:?}", note);
    //     }
    //     // let err = note.is_err();
    //     assert!(note.is_ok(), "Parsed note successfully");
    //     // assert_eq!(note.front_matter)
    //     // assert_eq!(rsult, 4);
    // }
}
