use serde::{Deserialize, Serialize};
use sqlx::prelude::Type;

use include_dir::{include_dir, Dir};

static DOCS: Dir = include_dir!("$FLUSTER_NATIVE_ROOT/docs/embedded");

#[derive(Type, Deserialize, Serialize)]
pub enum InternalEmbeddedDocsId {
    // OnBoardingWelcome,
    // /// This is shown to the user if they attempt to initialize the app for the first time
    // /// while behind a firewall, as that casues issues with the Github api call used to get the
    // /// embedded postgres binary.
    // OnBoardingDatabaseFailBecauseOfHttpsMessage,
    /// This is the super general public version of the model, designed to peak interest, not
    /// prove the model.
    ModelIntro,
    // /// This is the somewhat academic version of the model. Not fully peer-review worthy, but
    // /// who gives a shit. It's right.
    // ModelFull,
}

pub fn get_embedded_doc(id: InternalEmbeddedDocsId) -> String {
    let p = match id {
        InternalEmbeddedDocsId::ModelIntro => DOCS
            .get_file("/my_work/full_model.mdx")
            .expect("Did not successfully load full_model.mdx"),
    };
    p.contents_utf8()
        .expect("Failed to load contents from an embedded doc.")
        .to_string()
}
