use lancedb::{
    index::{scalar::FtsIndexBuilder, vector::IvfPqIndexBuilder},
    Connection, DistanceType,
};

use crate::core::{
    database::tables::table_paths::DatabaseTables,
    types::errors::errors::{FlusterError, FlusterResult},
};

pub async fn set_mdx_note_body_index(db: &Connection) -> FlusterResult<()> {
    let tbl = db
        .open_table(DatabaseTables::MdxNote.to_string())
        .execute()
        .await
        .map_err(|e| {
            println!("Error: {:?}", e);
            FlusterError::FailToCreateIndex
        })?;
    // FtsIndexBuilder::
    // tbl.create_index(
    //     &["raw_body"],
    //     lancedb::index::Index::FTS(FtsIndexBuilder::default()),
    // )
    // .execute()
    // .await
    // .map_err(|e| {
    //     println!("Error: {:?}", e);
    //     FlusterError::FailToCreateIndex
    // })?;
    tbl.create_index(
        &["vec"],
        lancedb::index::Index::IvfPq(
            // Here we specify advanced indexing parameters.  In this case
            // we are creating an index that my have better recall than the
            // default but is also larger and slower.
            IvfPqIndexBuilder::default()
                // This overrides the default distance type of l2
                .distance_type(DistanceType::L2), // // With 1000 rows this have been ~31 by default
                                                  // .num_partitions(50)
                                                  // // With dimension 128 this would have been 8 by default
                                                  // .num_sub_vectors(16),
        ),
    )
    .execute()
    .await
    .map_err(|e| {
        println!("Error: {:?}", e);
        FlusterError::FailToCreateIndex
    })?;
    Ok(())
}
