use include_dir::{include_dir, Dir};

use crate::core::types::errors::errors::{FlusterError, FlusterResult};

use super::data::internal_embedded_docs_id::InternalEmbeddedDocsId;

static DOCS: Dir = include_dir!("$CARGO_MANIFEST_DIR/src/features/embedded_docs/embedded_docs");

#[tauri::command]
#[specta::specta]
pub fn get_embedded_doc(id: InternalEmbeddedDocsId) -> String {
    let _path = match id {
        InternalEmbeddedDocsId::ModelFull => "my_work/full_model.mdx",
        InternalEmbeddedDocsId::ModelIntro => "my_work/model_intro.mdx",
        InternalEmbeddedDocsId::HowToContribute => "how_to_contribute.mdx",
        InternalEmbeddedDocsId::GettingStarted => "getting_started.mdx",
        InternalEmbeddedDocsId::ColorProps => "color_props.mdx",
        InternalEmbeddedDocsId::IntroToJsx => "intro_to_jsx.mdx",
        InternalEmbeddedDocsId::JupyterSetup => "jupyter_setup.mdx",
        InternalEmbeddedDocsId::QuickReference => "quick_ref.mdx",
        InternalEmbeddedDocsId::Mermaid => "mermaid.mdx",
    };
    let res = DOCS
        .get_file(_path)
        .expect("Did not successfully load docs.");
    res.contents_utf8()
        .expect("Failed to load contents from an embedded doc.")
        .to_string()
}

#[tauri::command]
#[specta::specta]
pub fn get_embedded_doc_by_relative_path(fp: String) -> FlusterResult<String> {
    if let Some(res) = DOCS.get_file(fp) {
        let string_res = res.contents_utf8().unwrap().to_string();
        Ok(string_res)
    } else {
        Err(FlusterError::FailToLoadDocs)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn gets_all_ids() {
        let docs = get_embedded_doc(InternalEmbeddedDocsId::ModelIntro);
        assert!(!docs.is_empty(), "Returns a file with content.");
        // assert_eq!(result, 4);
    }
}
