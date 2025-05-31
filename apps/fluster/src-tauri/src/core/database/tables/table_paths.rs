use serde::{Deserialize, Serialize};
use strum_macros::{Display, EnumIter};

#[derive(Serialize, Deserialize, Display, EnumIter, PartialEq)]
pub enum DatabaseTables {
    #[strum(to_string = "snippet")]
    Snippets,
    #[strum(to_string = "tag")]
    Tags,
    #[strum(to_string = "topic")]
    Topics,
    #[strum(to_string = "subject")]
    Subjects,
    #[strum(to_string = "settings")]
    Settings,
}
