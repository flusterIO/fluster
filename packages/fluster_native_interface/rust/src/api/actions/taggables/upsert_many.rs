use diesel_async::AsyncPgConnection;
use fluster_db::entities::taggable::tag_model::{TagCreatable, TagEntity};
use fluster_types::errors::errors::{FlusterError, FlusterResult};
use flutter_rust_bridge::frb;

// PERFORMANCE: These writes can likely be grouped for a probably pretty significant performance boost. Come back and handle that when things are in good shape.

#[allow(clippy::bind_instead_of_map)]
#[frb(ignore)]
pub async fn upsert_many_tags(
    c: &mut AsyncPgConnection,
    tags: Vec<TagCreatable>,
) -> FlusterResult<()> {
    use fluster_db::generated::main_schema::taggable::dsl::*;

    use diesel_async::RunQueryDsl;
    if let Ok(existing_tags) = taggable.load::<TagEntity>(c).await {
        let mut existing = existing_tags.into_iter();
        for tag in tags {
            let exists = &existing.any(|x| (x.value == tag.value) && (x.tag_type == tag.tag_type));
            if *exists {
                diesel::insert_into(taggable)
                    .values(&tag)
                    .execute(c)
                    .await
                    .or_else(|_| Err(FlusterError::FailToUpsertTags))?;
            }
        }
        Ok(())
    } else {
        Err(FlusterError::FailToUpsertTags)
    }
}

#[cfg(test)]
mod tests {
    use fluster_types::enums::taggable_type::TaggableTypeEnum;

    use crate::api::data_interface::database::db::get_database_connection;

    use super::*;

    #[tokio::test]
    async fn upserts_tags_successfully() {
        let tags = vec![
            TagCreatable {
                tag_type: TaggableTypeEnum::Tag.to_string(),
                value: "Test tag one".to_string(),
                id: None,
            },
            TagCreatable {
                tag_type: TaggableTypeEnum::Topic.to_string(),
                value: "Test topic one".to_string(),
                id: None,
            },
            TagCreatable {
                tag_type: TaggableTypeEnum::Subject.to_string(),
                value: "Test subject one".to_string(),
                id: None,
            },
        ];
        let mut c = get_database_connection()
            .await
            .expect("Connected to database successfully.");
        let res = upsert_many_tags(&mut c, tags);
        assert!(res.await.is_ok(), "Saved tags without throwing an error.");
    }
}
