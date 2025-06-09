use std::ops::Index;

use crate::{
    core::{
        database::db::get_database,
        types::errors::errors::{FlusterError, FlusterResult},
    },
    features::bibliography::data::{bib_entry_entity::BibEntryEntity, bib_file::BibtexFile},
};

pub async fn sync_bibliography(bib_path: &str) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let res = BibtexFile::from_filesystem_path(bib_path)
        .await
        .map_err(|e| {
            println!("Error: {:?}", e);
            FlusterError::FailToParseBibFile
        })?;
    println!("Response: {:?}", res.entries.index(0));
    BibEntryEntity::save_many(&db, &res.entries)
        .await
        .map_err(|e| {
            println!("Error: {:?}", e);
            FlusterError::FailToFind
        })?;
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn syncs_bibliography() {
        let res = sync_bibliography("/Users/bigsexy/Desktop/notes/content/citations.bib").await;
        assert!(
            res.is_ok(),
            "Syncs bibliography without returning an error."
        )
        // assert_eq!(result, 4);
    }
}
