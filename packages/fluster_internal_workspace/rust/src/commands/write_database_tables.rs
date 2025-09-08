use clap::{Args, Parser, Subcommand};

#[derive(Args, Debug)]
pub struct WriteDatabaseTablesCommand {}

pub fn write_database_tables() {
    println!("Write database tables")
}
