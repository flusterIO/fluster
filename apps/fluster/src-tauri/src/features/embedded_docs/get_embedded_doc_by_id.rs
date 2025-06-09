use include_dir::{include_dir, Dir};

use super::data::internal_embedded_docs_id::InternalEmbeddedDocsId;

static DOCS: Dir = include_dir!("$FLUSTER_NATIVE_ROOT/docs/embedded");

#[tauri::command]
#[specta::specta]
pub fn get_embedded_doc(id: InternalEmbeddedDocsId) -> String {
    let _path = match id {
        InternalEmbeddedDocsId::ModelFull => "my_work/full_model.mdx",
        InternalEmbeddedDocsId::ModelIntro => "my_work/model_intro.mdx",
        InternalEmbeddedDocsId::HowToContribute => "how_to_contribute.mdx",
    };
    let res = DOCS
        .get_file(_path)
        .expect("Did not successfully load docs.");
    res.contents_utf8()
        .expect("Failed to load contents from an embedded doc.")
        .to_string()
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
