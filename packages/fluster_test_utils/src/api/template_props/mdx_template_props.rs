use handlebars::RenderError;
use serde::{Deserialize, Serialize};

pub static TEMPLATE_DIR: include_dir::Dir =
    include_dir::include_dir!("$FLUSTER_NATIVE_ROOT/packages/fluster_test_utils/src/templates");

#[derive(Debug, Serialize, Deserialize)]
pub struct MdxTestContent {
    pub title: String,
    pub tags: Vec<String>,
}

pub fn get_test_tags() -> Vec<String> {
    vec![
        "tag-1".to_string(),
        "tag-2".to_string(),
        "tag-3".to_string(),
        "tag-4".to_string(),
        "tag-5".to_string(),
    ]
}

pub fn get_test_title() -> String {
    "Test Title Text".to_string()
}

pub fn get_test_date() -> chrono::prelude::DateTime<chrono::prelude::Utc> {
    let val: chrono::DateTime<chrono::prelude::Utc> = "4/15/25".parse().unwrap();

    val
}

impl Default for MdxTestContent {
    fn default() -> Self {
        Self {
            title: get_test_title(),
            tags: get_test_tags(),
        }
    }
}

impl MdxTestContent {
    pub fn tag_string(&self) -> String {
        self.tags.join(", ")
    }

    pub fn content_title(&self) -> String {
        "Content Test Title".to_string()
    }
    pub async fn get_test_content(&self) -> Result<String, RenderError> {
        let reg = handlebars::Handlebars::new();
        let file = TEMPLATE_DIR
            .get_file("test_mdx.mdx")
            .expect("Failed to load file from embedded template_dir.");
        let body = file.contents_utf8().unwrap();
        // body.to_string(
        reg.render_template(body, &self)
    }
}
