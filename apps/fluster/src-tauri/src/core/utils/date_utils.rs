use chrono::Utc;

pub fn new_date_now() -> i64 {
    return Utc::now().timestamp_millis();
}
