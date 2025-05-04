//! Example showing how to use logging with a rolling trigger based on size
//!
//! NB: The size used in the example is intentionally small so multiple file
//! will be created in the 2 seconds that the example is set to run and is not
//! intended for practical for usage

/// This is the size at which a new file should be created. For the demo it is
/// set to 2KB which is very small and only for demo purposes
const TRIGGER_FILE_SIZE: u64 = 2 * 1024;

/// Delay between log messages for demo purposes
const TIME_BETWEEN_LOG_MESSAGES: Duration = Duration::from_millis(10);

/// Number of archive log files to keep
const LOG_FILE_COUNT: u32 = 3;

/// Time demo is set to run for (Set to be long enough for multiple files to be created)
const RUN_TIME: Duration = Duration::from_secs(2);

/// Location where logs will be written to
const FILE_PATH: &str = "/logs/fluster.log";

/// Location where log archives will be moved to
/// For Pattern info See:
///     https://docs.rs/log4rs/*/log4rs/append/rolling_file/policy/compound/roll/fixed_window/struct.FixedWindowRollerBuilder.html#method.build
const ARCHIVE_PATTERN: &str = "/tmp/archive/fluster.{}.log";

use std::{path::PathBuf, time::Duration};

use fluster_types::errors::errors::FlusterError;
use log::LevelFilter;
use log4rs::{
    append::{
        console::{ConsoleAppender, Target},
        rolling_file::policy::compound::{
            roll::fixed_window::FixedWindowRoller, trigger::size::SizeTrigger, CompoundPolicy,
        },
    },
    config::{Appender, Config, Root},
    encode::pattern::PatternEncoder,
    filter::threshold::ThresholdFilter,
    Handle,
};

fn get_output_root() -> Result<PathBuf, FlusterError> {
    // let output_root = dirs::data_dir().unwrap_or(dirs::data_local_dir().unwrap_or(dirs::config_dir()));
    let mut d = dirs::data_dir();
    if d.is_some() {
        Ok(d.unwrap())
    } else {
        d = dirs::data_local_dir();
        if d.is_some() {
            Ok(d.unwrap())
        } else {
            d = dirs::config_dir();
            if d.is_some() {
                Ok(d.unwrap())
            } else {
                Err(FlusterError::DataDirNotFound())
            }
        }
    }
}

pub fn get_logger() -> Result<Handle, FlusterError> {
    let output_root = get_output_root()?;
    let level = log::LevelFilter::Info;

    // Build a stderr logger.
    let stderr = ConsoleAppender::builder().target(Target::Stderr).build();

    // Create a policy to use with the file logging
    let trigger = SizeTrigger::new(TRIGGER_FILE_SIZE);
    let roller = FixedWindowRoller::builder()
        .base(0) // Default Value (line not needed unless you want to change from 0 (only here for demo purposes)
        .build(ARCHIVE_PATTERN, LOG_FILE_COUNT) // Roll based on pattern and max 3 archive files
        .unwrap();
    let policy = CompoundPolicy::new(Box::new(trigger), Box::new(roller));

    // Logging to log file. (with rolling)
    let logfile = log4rs::append::rolling_file::RollingFileAppender::builder()
        // Pattern: https://docs.rs/log4rs/*/log4rs/encode/pattern/index.html
        .encoder(Box::new(PatternEncoder::new("{l} - {m}\n")))
        .build(output_root.join(FILE_PATH), Box::new(policy))
        .unwrap();

    // Log Trace level output to file where trace is the default level
    // and the programmatically specified level to stderr.
    let config = Config::builder()
        .appender(Appender::builder().build("logfile", Box::new(logfile)))
        .appender(
            Appender::builder()
                .filter(Box::new(ThresholdFilter::new(level)))
                .build("stderr", Box::new(stderr)),
        )
        .build(
            Root::builder()
                .appender("logfile")
                .appender("stderr")
                .build(LevelFilter::Trace),
        )
        .unwrap();

    // Use this to change log levels at runtime.
    // This means you can change the default log level to trace
    // if you are trying to debug an issue and need more logs on then turn it off
    // once you are done.
    let _handle = log4rs::init_config(config);
    if (_handle.is_err()) {
        return Err(FlusterError::DataDirNotFound());
    }

    Ok(_handle.unwrap())
}
