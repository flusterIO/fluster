use crossbeam_channel::Sender;
use fluster_models::models::bibliography::bib_file::BibtexFile;
use fluster_types::{
    errors::{any_error::AnyFlusterError, errors::FlusterError},
    typedefs::note_type_utils::FlusterDb,
};

pub async fn sync_user_bibliography(
    bib_path: &str,
    error_sender: Sender<FlusterError>,
    db: &FlusterDb,
) {
    let bib_file = BibtexFile::from_filesystem_path(bib_path).await;
    // FIXME: Add error handling here.
    if bib_file.is_ok() {
        // bib_file.unwrap().save_entries(db).await;
    } else {
        error_sender.send(Box::new(FlusterError::CannotParseBibfile));
    }
}
