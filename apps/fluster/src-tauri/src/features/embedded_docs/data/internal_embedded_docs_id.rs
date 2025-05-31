use serde::{Deserialize, Serialize};

use include_dir::{include_dir, Dir};
use specta::Type;

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
    /// This is the somewhat academic version of the model. Not fully peer-review worthy, but
    /// who gives a shit. It's right.
    ModelFull,
}
