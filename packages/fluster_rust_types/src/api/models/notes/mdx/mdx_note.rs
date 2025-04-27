// use fluster_rust_types::database_errors;
use gray_matter::{engine::YAML, Matter};
use serde::Serialize;

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
        println!("Raw Content: {:?}", raw_file_content);
        let result = matter.parse(&raw_file_content);
        println!("Result: {:?}", result);
        let fp = file_path.unwrap_or("Unknown");
        Ok(MdxNoteRust {
            front_matter: FrontMatter::from_gray_matter(result.data),
            raw_body: result.content,
            file_path: fp.to_owned(),
        })
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

    use super::*;

    #[test]
    fn parses_note_from_fs_successfully() {
        let test_content_path = fluster_test_utils::test_utils::get_test_mdx_path();
        let note = MdxNoteRust::from_file_system_path(test_content_path.to_str().unwrap());
        println!("Parsed Note: {:?}", note);
        assert!(note.is_ok(), "Note did not return errors.");
        assert_eq!(
            note.as_ref().unwrap().front_matter.title.as_ref().unwrap(),
            // note.as_ref().unwrap().front_matter.title.unwrap(),
            "Title in frontmatter",
            "Front matter sets title properly"
        );

        assert_eq!(
            note.as_ref().unwrap().front_matter.summary.as_ref().unwrap(),
            "Vestibulum, convallis lectus id, in magnis enim tempor lacus imperdiet. Eget porta nulla auctor, et purus nulla tristique ac, imperdiet.Test summary",
            "Front matter sets summary properly"
        );

        assert_eq!(
            note.as_ref()
                .unwrap()
                .front_matter
                .note_id
                .as_ref()
                .unwrap(),
            "myTestNote",
            "Front matter sets id properly"
        );
    }

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
    //     if note.is_err() {
    //         println!("Note: {:?}", note);
    //     }
    //     // let err = note.is_err();
    //     assert!(note.is_ok(), "Parsed note successfully");
    //     // assert_eq!(note.front_matter)
    //     // assert_eq!(rsult, 4);
    // }
}
