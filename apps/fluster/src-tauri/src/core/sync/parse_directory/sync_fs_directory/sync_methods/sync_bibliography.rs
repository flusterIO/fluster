use crate::{
    core::types::errors::errors::{FlusterError, FlusterResult},
    features::bibliography::data::bib_file::BibtexFile,
};

pub async fn sync_bibliography(bib_path: &str) -> FlusterResult<()> {
    BibtexFile::from_filesystem_path(bib_path)
        .await
        .map_err(|_| FlusterError::FailToParseBibFile)?;
    Ok(())
}
