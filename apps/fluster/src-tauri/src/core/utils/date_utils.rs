use std::str::FromStr;

use chrono::Utc;

use crate::core::types::errors::errors::{FlusterError, FlusterResult};

pub fn parse_date(d: &str) -> FlusterResult<i64> {
    println!("Date: {:?}", d);
    let i: FlusterResult<i64> = d.parse().map_err(|_| FlusterError::FailToParseDate);
    if i.is_ok() {
        return Ok(i.unwrap());
    } else if let Ok(c) = chrono::DateTime::<Utc>::from_str(d) {
        return Ok(c.timestamp_millis());
    }
    Err(FlusterError::FailToParseDate)
}

pub fn new_date_now() -> i64 {
    Utc::now().timestamp_millis()
}
