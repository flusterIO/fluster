use std::str::FromStr;

use chrono::Utc;

use crate::core::types::errors::errors::{FlusterError, FlusterResult};

pub fn parse_date(d: &str) -> FlusterResult<i64> {
    let i: FlusterResult<i64> = d.parse().map_err(|_| FlusterError::FailToParseDate);
    if let Ok(_date) = i {
        return Ok(_date);
    } else if let Ok(c) = chrono::DateTime::<Utc>::from_str(d) {
        return Ok(c.timestamp_millis());
    }
    Err(FlusterError::FailToParseDate)
}

pub fn new_date_now() -> i64 {
    Utc::now().timestamp_millis()
}

pub fn reformat_date(d: &str) -> String {
    let format = "%Y-%m-%dT%H:%M:%S";
    if let Ok(datetime) = chrono::DateTime::parse_from_str(d, format) {
        return datetime.timestamp_millis().to_string();
    }
    if let Ok(res) = chrono::DateTime::<Utc>::from_str(d) {
        return res.timestamp_millis().to_string();
    }
    let parsed_time_stamp: Result<i64, _> = d.parse();
    if parsed_time_stamp.is_ok() {
        return format!("{}", parsed_time_stamp.unwrap());
    }
    "0".to_string()
}

#[cfg(test)]
mod tests {
    use std::ops::Index;

    use crate::features::math::commands::get_equations::get_equations;

    use super::*;

    #[tokio::test]
    async fn reformats_date() {
        let d = get_equations().await;
        assert!(&d.is_ok(), "Returns equations without throwing an error.");
        assert!(
            !&d.as_ref().unwrap().is_empty(),
            "Returns a non-empty list of equations"
        );
        let res = reformat_date(&d.unwrap().index(0).equation.ctime);

        assert!(res != "0", "Reformats date without returning the default.");
    }
}
