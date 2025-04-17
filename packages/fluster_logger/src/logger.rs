use std::path::PathBuf;

use log4rs::{
    append::rolling_file::{
        policy::compound::{
            roll::{fixed_window::FixedWindowRoller, Roll},
            trigger::{size::SizeTrigger, Trigger},
            CompoundPolicy,
        },
        RollingFileAppender,
    },
    config::Root,
    Config,
};
use tracing::level_filters::LevelFilter;

fn get_data_dir() -> PathBuf {
    match dirs::data_dir() {
        Some(x) => x,
        None => match dirs::cache_dir() {
            Some(x) => x,
            None => match dirs::config_dir() {
                Some(x) => x,
                None => match dirs::home_dir() {
                    Some(x) => x.join(".config").join("Fluster"),
                    None => panic!("Failed to locate a valid location where Fluster can store data. Plese submit an issue on Fluster's Github.")
                }

            }
        }
    }
}

fn get_log_dir() -> PathBuf {
    get_data_dir().join("logs")
}

fn get_appender(
) -> Result<RollingFileAppender, fluster_rust_types::native_interface_errors::NativeInterfaceError>
{
    let x = RollingFileAppender::builder()
        .encoder(Box::new(log4rs::encode::json::JsonEncoder::new()))
        .build(
            get_log_dir().to_str(),
            CompoundPolicy::new(
                Box::new(SizeTrigger::new(5120)),
                Box::new(FixedWindowRoller::builder().build("log{}", 3)).unwrap(),
            ),
        );
    if (x.is_err()) {
        return Err(fluster_rust_types::native_interface_errors::NativeInterfaceError::FailToLocateStorageDir);
    }
    Ok(x)
}

// TODO: Enable a dynamic logging level here.
pub fn get_logger() {
    let appender = get_appender().expect("Failed to create logger.");
    let config = Config::builder().appender(appender).build(
        Root::builder()
            .appender("logfile")
            .build(LevelFilter::DEBUG),
    );
}
