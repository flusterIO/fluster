use std::{path::PathBuf, str::FromStr};

use crate::{
    core::types::{
        errors::errors::{FlusterError, FlusterResult},
        FlusterDb,
    },
    features::bibliography::data::bib_entry_model::BibEntryModel,
};
use biblatex::Bibliography;
use chrono::Utc;

use super::bib_entry_entity::BibEntryEntity;

pub struct BibtexFile {
    pub path: Option<String>,
    pub entries: Vec<BibEntryModel>,
}

impl BibtexFile {
    pub async fn from_raw_file_content(file_content: &str) -> Result<Self, FlusterError> {
        let bib = Bibliography::parse(file_content).unwrap();
        let mut items: Vec<BibEntryModel> = Vec::new();
        let now = Utc::now().to_string();
        for entry in bib.iter() {
            println!("Entry: {:?}", entry);
            let json_string = serde_json::to_string_pretty(&entry)
                .map_err(|_| FlusterError::FailToParseBibFile)?;
            // FIXME: This will likely overwrite the user's user_provided_id if we don't have those
            // in advance and apply it here. It might be possible to use a partial model without
            // this key and a `merge_insert` command to avoid overwriting that data.
            let model = BibEntryModel {
                ctime: now.clone(),
                id: entry.key.clone(),
                data: json_string,
                user_provided_id: None,
            };
            items.push(model);
        }
        Ok(BibtexFile {
            path: None,
            entries: items,
        })
    }

    pub async fn from_filesystem_path(fspath: &str) -> Result<Self, FlusterError> {
        let fs_path = PathBuf::from_str(fspath);
        if fs_path.is_ok() && !fs_path.as_ref().unwrap().exists() {
            return Err(FlusterError::SettingsBibPathNotFound);
        }
        let file_content = tokio::fs::read_to_string(fs_path.unwrap())
            .await
            .map_err(|_| FlusterError::FailToParseBibFile)?;
        BibtexFile::from_raw_file_content(&file_content).await
    }

    // #[cfg(test)]
    // pub fn get_js_parser_wrapper(&self) -> String {
    //     self.get_js_parser()
    // }

    pub async fn save_entries(&self, db: &FlusterDb<'_>) -> FlusterResult<()> {
        BibEntryEntity::save_many(db, &self.entries).await
    }
}

#[cfg(test)]
mod tests {

    use super::*;

    const TEST_BIB: &'static str = "/Users/bigsexy/Desktop/notes/content/citations.bib";

    #[tokio::test]
    async fn bib_manager_parses_file_successfully() {
        let bib = BibtexFile::from_filesystem_path(TEST_BIB).await;
        assert!(bib.is_ok(), "Parses bib file without error");
        // assert_eq!(result, 4);
    }

    // #[tokio::test]
    // async fn get_js_parser() {
    //     let x = BibtexFile::from_filesystem_path(TEST_BIB)
    //         .await
    //         .expect("Parses bib without throwing an error.");
    //     let p = x.get_js_parser_wrapper();
    //     assert_ne!(p, "", "Returns a non-empty string");
    //     // assert_eq!(result, 4);
    // }
}
