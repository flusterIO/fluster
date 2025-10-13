use serde::{Deserialize, Serialize};
use specta::Type;

use crate::{
    core::{
        database::db::get_database,
        models::taggable::{
            shared_taggable_model::SharedTaggableModel, subject_entity::SubjectEntity,
            tag_entity::TagEntity, topic_entity::TopicEntity,
        },
        types::errors::errors::FlusterResult,
    },
    features::{
        bookmark::commands::get_bookmarked_notes::get_bookmarked_notes_method,
        mdx::data::{mdx_note_entity::MdxNoteEntity, mdx_note_model::MdxNoteModel},
        task_manager::{task_entity::TaskEntity, task_model::TaskModel},
    },
};

#[derive(Debug, Deserialize, Serialize, Type, Default)]
pub struct DashboardData {
    topics: Vec<SharedTaggableModel>,
    subjects: Vec<SharedTaggableModel>,
    tags: Vec<SharedTaggableModel>,
    note_count: usize,
    bookmarks: Vec<MdxNoteModel>,
    incomplete_tasks: Vec<TaskModel>,
}

#[tauri::command]
#[specta::specta]
pub async fn get_dashboard_data() -> FlusterResult<DashboardData> {
    let db_res = get_database().await;
    let db = db_res.lock().await;

    let bookmarked_notes = get_bookmarked_notes_method(&db).await?;

    let tasks = TaskEntity::get_incomplete(&db).await?;

    let data = DashboardData {
        topics: TopicEntity::get_all(&db).await?,
        subjects: SubjectEntity::get_all(&db).await?,
        tags: TagEntity::get_many(&db).await?,
        note_count: MdxNoteEntity::get_all(&db).await?.len(),
        bookmarks: bookmarked_notes.iter().map(|x| x.note.clone()).collect(),
        incomplete_tasks: tasks,
    };

    Ok(data)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn gets_dashboard_data() {
        let data = get_dashboard_data().await;
        assert!(
            data.is_ok(),
            "Returns dashboard data without throwing an error."
        );
        // assert_eq!(result, 4);
    }
}
