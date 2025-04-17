use std::error::Error;
use std::future::Future;

use serde::{Deserialize, Serialize};

use crate::api::{errors::parsing_errors::MdxParsingError, models::frontmatter::FrontMatter};

#[derive(Debug, Serialize, Deserialize)]
struct MdxNote {
    pub id: Option<surrealdb::sql::Thing>,
    pub path: String,
    pub content: String,
    pub title: String,
    pub matter: FrontMatter,
}

impl MdxNote {
    pub async fn get_title_from_contents(
        &self,
        file_contents_by_line: Iter<String>,
        depth: int,
    ) -> Result<&str, NoTitleError> {
        let prefix = format!("${''.repeat(depth)} ");
        let title: Result<&str, NoTitleError> =
            match file_contents_by_line.find(|x| x.starts_with(prefix)) {
                Some(t) => t,
                None => {
                    if (depth == 6) {
                        return Err(NoTitleError::new(self.path));
                    }
                    return self.get_title_from_contents(file_contents_by_line, depth + 1);
                }
            };
        return title;
    }

    /// fileContent is the *entire* file contents, including front matter.
    pub async fn from_raw_content(
        file_contents: &str,
        path: &str,
        matter: gray_matter::Matter<gray_matter::engine::YAML>,
    ) -> Future<Self> {
        // let data = gray_matter::engine::
        let data = matter.parse(file_contents);
        return MdxNote {
            id: null,
            matter: FrontMatter::from_gray_matter(data.pod),
            title: "".to_string(),
            path: path.to_string(),
            content: data.content,
        };
    }
    pub async fn from_file_path(
        file_path: &str,
        matter: gray_matter::Matter<gray_matter::engine::YAML>,
    ) -> Result<Self, Error> {
        if (std::fs::exists(file_path).is_err()) {
            return Err(crate::api::errors::parsing_errors::PathNotFoundError::new(
                path,
            ));
        }
        let contents = match std::fs::read_to_string(file_path) {
            Ok(val) => val,
            Err(e) => MdxParsingError::new(file_path),
        };
        return MdxNote::from_raw_content(&contents, file_path, matter);
    }
}

#[cfg(test)]
mod tests {
    use std::io::Write;

    use crate::api::models::frontmatter::FrontMatter;

    use super::*;

    #[tokio::test]
    async fn parses_mdx_from_file_system() {
        let test_dir = fluster_test_utils::get_temp_test_dir().unwrap();
        let test_dir_path = test_dir.path();
        let test_file_path = test_dir_path.join("/tempFile");
        let test_data = fluster_test_utils::mdx_template_props::MdxTestContent::default();

        let test_content = test_data.get_test_content().await?;
        test_file.write(test_content.as_bytes());
        test_file.sync_all();
        let parser = FrontMatter::get_matter_parser();
        let note = match MdxNote::from_file_path(test_file_path.to_str(), parser).await {
            Ok(n) => n,
            Err(e) => panic!("Failed to parse temporary file."),
        };

        assert_eq!(
            note.path,
            test_file_path.to_str(),
            "Path was not set properly."
        );

        assert_eq!(
            note.title,
            fluster_test_utils::mdx_template_props::get_test_title(),
            "Title was not set properly."
        );

        // assert_eq!(result, 4);
    }
}
