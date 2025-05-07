pub use filetime::FileTime;
use serde::{Deserialize, Serialize};
pub use time::OffsetDateTime;

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct FlusterTime {
    #[serde(with = "time::serde::iso8601")]
    pub value: OffsetDateTime,
}

impl Default for FlusterTime {
    fn default() -> Self {
        FlusterTime::now()
    }
}

impl FlusterTime {
    pub fn now() -> FlusterTime {
        FlusterTime {
            value: OffsetDateTime::now_utc(),
        }
    }
    #[allow(clippy::manual_map)]
    pub fn from_file_time(ft: Option<FileTime>) -> Option<FlusterTime> {
        match ft {
            Some(x) => Some(FlusterTime {
                value: time::OffsetDateTime::from_unix_timestamp(x.unix_seconds()).unwrap(),
            }),
            None => None,
        }
    }
}
