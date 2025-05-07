use rayon::iter::ParallelIterator;
use rayon::prelude::*;
use serde::{Deserialize, Serialize};
use tsify::Tsify;

#[derive(Serialize, Tsify, Deserialize, Clone, PartialEq, Hash, Eq, Default)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum SettingPageId {
    #[default]
    General,
    WebInterface,
    Ui,
    KeyMap,
    Ai,
    SearchAndAutoSettings,
    SyncAndDatabase,
}

impl ParallelIterator for SettingPageId {
    type Item = SettingPageId;

    fn drive_unindexed<C>(self, consumer: C) -> C::Result
    where
        C: rayon::iter::plumbing::UnindexedConsumer<Self::Item>,
    {
        let iter = std::iter::once(self).par_bridge();
        iter.drive_unindexed(consumer)
    }
}
