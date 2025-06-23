use enum_iterator::Sequence;
use rayon::iter::ParallelIterator;
use rayon::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Sequence, Clone)]
pub enum SettingUniqueKey {
    /// The path tothe base of the user's notes.
    NotesDirectoryRootPath,
    Bibpath,
    Darkmode,
    KeymapTogglePanelLeft,
    KeymapTogglePanelRight,
    KeymapOpenCommandPalette,
    KeymapCommandPaletteBack,
    KeymapFocusItemDown,
    KeymapFocusItemUp,
    KeymapFocusItemRight,
    KeymapFocusItemLeft,
}

impl ParallelIterator for SettingUniqueKey {
    type Item = SettingUniqueKey;

    fn drive_unindexed<C>(self, consumer: C) -> C::Result
    where
        C: rayon::iter::plumbing::UnindexedConsumer<Self::Item>,
    {
        let iter = std::iter::once(self).par_bridge();
        iter.drive_unindexed(consumer)
    }
}
