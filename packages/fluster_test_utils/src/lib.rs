mod api;
pub use api::template_props::mdx_template_props;
pub use api::test_utils;
use tempfile::tempdir;

pub fn get_temp_test_dir() -> Result<tempfile::TempDir, std::io::Error> {
    tempdir()
}
