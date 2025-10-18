use crate::core::types::errors::errors::{FlusterError, FlusterResult};
use polars::prelude::*;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use specta::Type;
use std::collections::HashMap;
use std::io::Cursor;

// type Record = HashMap<String, Value>;

#[derive(Type)] // Derive Type for your custom struct or enum if needed
pub struct TabularData {
    pub data: HashMap<String, Value>,
}

fn dataframe_to_hashmap_array(df: &mut DataFrame) -> PolarsResult<Vec<HashMap<String, Value>>> {
    let mut buf: Vec<u8> = Vec::new();
    let cursor = Cursor::new(&mut buf);

    JsonWriter::new(cursor)
        .with_json_format(JsonFormat::Json) // Use array-of-objects format
        .finish(df)?;

    let records: Vec<HashMap<String, Value>> = serde_json::from_slice(&buf).map_err(|e| {
        PolarsError::ComputeError(format!("Failed to deserialize JSON: {}", e).into())
    })?;

    Ok(records)
}

#[tauri::command]
#[specta::specta]
pub async fn load_tabular_file(
    relative_path: String,
    base_path: String,
    with_has_header: bool,
) -> FlusterResult<Vec<HashMap<String, Value>>> {
    let path = match relative_path.contains(&base_path) {
        true => std::path::Path::new(&relative_path),
        false => &std::path::Path::new(&base_path).join(relative_path),
    };

    if !path.exists() || path.is_dir() {
        return Err(FlusterError::FileDoesNotExist);
    }

    let file_content = tokio::fs::read_to_string(path.to_path_buf())
        .await
        .map_err(|_| FlusterError::FailToReadFile)?;
    let cursor = Cursor::new(file_content);

    let csv = CsvReader::new(cursor);
    let mut df = csv
        .with_options(CsvReadOptions::default().with_has_header(with_has_header))
        .finish()
        .map_err(|_| FlusterError::FailToParseTabularFile)?;

    println!("{:?}", df);

    if !with_has_header {
        // - The first row has columns that are not strings or are empty
        // - The first row's columns are not all unique
        // - The first row appears to contain dates or other common data formats (eg, xx-xx-xx)
        let row_1 = df.get_row(0);
        println!("{:?}", row_1);
    }

    // .map_err().collect().unwrap();
    let data =
        dataframe_to_hashmap_array(&mut df).map_err(|_| FlusterError::FailToParseTabularFile)?;
    Ok(data)
}
