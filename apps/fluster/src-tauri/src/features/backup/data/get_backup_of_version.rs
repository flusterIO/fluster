use crate::{
    core::types::errors::errors::{FlusterError, FlusterResult},
    features::backup::data::{backup_data::BackupData, v1::BackupDataV1},
};

pub fn get_backup_data_of_version(version: i16) -> FlusterResult<impl BackupData> {
    match version {
        1 => Ok(BackupDataV1::default()),
        _ => Err(FlusterError::FailToFindBackupDataVersion),
    }
}
