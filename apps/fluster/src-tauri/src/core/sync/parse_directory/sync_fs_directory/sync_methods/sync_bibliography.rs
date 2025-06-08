use crate::core::{
    models::bibliography::bib_file::BibtexFile,
    types::errors::errors::{FlusterError, FlusterResult},
};

pub async fn sync_bibliography(bib_path: &str) -> FlusterResult<()> {
    let bib_file = BibtexFile::from_filesystem_path(bib_path)
        .await
        .map_err(|_| FlusterError::FailToParseBibFile)?;
    Ok(())
}
