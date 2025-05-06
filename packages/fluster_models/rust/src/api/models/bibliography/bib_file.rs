use std::{path::PathBuf, str::FromStr};

use biblatex::{Bibliography, Entry};
use fluster_types::{errors::errors::FlusterError, typedefs::note_type_utils::FlusterDb};
use tokio::fs;

use crate::api::embedded_ts::EmbeddedTypescriptFiles;

pub use super::citation::BibEntryEntity;

pub struct BibtexFile {
    pub path: Option<PathBuf>,
    pub entries: Vec<BibEntryEntity>,
}

impl BibtexFile {
    pub async fn from_raw_file_content(file_content: &str) -> Result<Self, FlusterError> {
        let bib = Bibliography::parse(file_content).unwrap();
        let mut items: Vec<Entry> = Vec::new();
        for k in bib.keys() {
            if let Some(item) = bib.get(k) {
                let _item = item.clone();
                items.push(_item);
            }
        }
        Ok(BibtexFile {
            path: None,
            entries: Vec::new(),
            // entries: items,
        })
    }
    pub async fn from_filesystem_path(fspath: &str) -> Result<Self, FlusterError> {
        let fs_path = PathBuf::from_str(fspath);
        if fs_path.is_ok() && !fs_path.as_ref().unwrap().exists() {
            return Err(FlusterError::SettingsBibPathNotFound);
        }
        let file_content = fs::read_to_string(&fs_path.unwrap()).await.unwrap();
        BibtexFile::from_raw_file_content(&file_content).await
    }

    fn get_js_parser(&self) -> String {
        let file_data =
            EmbeddedTypescriptFiles::get("sync_bibliography/sync_bibliography.cjs").unwrap();
        let res = std::str::from_utf8(file_data.data.as_ref()).unwrap();
        res.to_owned()
    }

    #[cfg(test)]
    pub fn get_js_parser_wrapper(&self) -> String {
        self.get_js_parser()
    }

    pub async fn save_entries(&self, db: &FlusterDb) {
        // let res =
        todo!();
    }
}

#[cfg(test)]
mod tests {
    use std::str::FromStr;

    use super::*;

    const TEST_BIB: &'static str = "/Users/bigsexy/Desktop/notes/content/citations.bib";

    #[tokio::test]
    async fn bib_manager_parses_file_successfully() {
        let bib = BibtexFile::from_filesystem_path(TEST_BIB).await;
        assert!(bib.is_ok(), "Parses bib file without error");
        // assert_eq!(result, 4);
    }

    #[tokio::test]
    async fn get_js_parser() {
        let x = BibtexFile::from_filesystem_path(TEST_BIB)
            .await
            .expect("Parses bib without throwing an error.");
        let p = x.get_js_parser_wrapper();
        assert_ne!(p, "", "Returns a non-empty string");
        // assert_eq!(result, 4);
    }
}
