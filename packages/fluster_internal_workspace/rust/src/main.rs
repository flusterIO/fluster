use std::path::PathBuf;
mod commands;
use clap::{Parser, Subcommand};

#[derive(Parser, Debug)]
#[command(author, version, about)]
struct Cli {
    #[clap(subcommand)]
    pub command: Commands,
}

#[derive(Subcommand, Debug)]
pub enum Commands {
    /// Write database tables to python and go outputs, creating typesafety across sdk.
    WriteDatabaseTables(commands::write_database_tables::WriteDatabaseTablesCommand),
}

fn main() {
    println!("Hello, world!");
}
