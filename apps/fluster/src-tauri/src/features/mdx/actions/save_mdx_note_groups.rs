use crate::{
    core::{
        models::taggable::{
            shared_taggable_model::SharedTaggableModel, subject_entity::SubjectEntity,
            tag_entity::TagEntity, topic_entity::TopicEntity,
        },
        sync::parse_directory::sync_fs_directory::sync_methods::clean::clean_database,
        types::{errors::errors::FlusterResult, FlusterDb},
    },
    features::{
        math::data::{equation_entity::EquationEntity, equation_model::EquationModel},
        mdx::data::{
            front_matter_entity::FrontMatterEntity, front_matter_model::FrontMatterModel,
            mdx_note_entity::MdxNoteEntity, mdx_note_equation_entity::MdxNoteEquationEntity,
            mdx_note_equation_model::MdxNoteEquationModel, mdx_note_group::MdxNoteGroup,
            mdx_note_model::MdxNoteModel, mdx_note_subject_entity::MdxNoteSubjectEntity,
            mdx_note_subject_model::MdxNoteSubjectModel, mdx_note_tag_entity::MdxNoteTagEntity,
            mdx_note_tag_model::MdxNoteTagModel, mdx_note_topic_entity::MdxNoteTopicEntity,
            mdx_note_topic_model::MdxNoteTopicModel,
        },
    },
};

pub async fn save_mdx_note_groups(
    db: &FlusterDb<'_>,
    groups: Vec<MdxNoteGroup>,
) -> FlusterResult<()> {
    clean_database(db).await?;
    // Loop over each item and generate the proper joining tables.
    let mut equations: Vec<EquationModel> = Vec::new();
    let mut mdx_note_equations: Vec<MdxNoteEquationModel> = Vec::new();
    let mut tags: Vec<SharedTaggableModel> = Vec::new();
    let mut subjects: Vec<SharedTaggableModel> = Vec::new();
    let mut topics: Vec<SharedTaggableModel> = Vec::new();
    let mut mdx_note_tags: Vec<MdxNoteTagModel> = Vec::new();
    let mut mdx_note_subjects: Vec<MdxNoteSubjectModel> = Vec::new();
    let mut mdx_note_topics: Vec<MdxNoteTopicModel> = Vec::new();
    let mut notes: Vec<MdxNoteModel> = Vec::new();
    // RESUME: based searching. That played a big part in the initial app.
    let mut front_matter: Vec<FrontMatterModel> = Vec::new();
    for item in groups.iter().filter(|x| !x.mdx.raw_body.is_empty()) {
        notes.push(item.mdx.clone());
        front_matter.push(item.front_matter.clone());
        for eq in item.equations.clone() {
            equations.push(eq.clone());
            if eq.equation_id.is_some() {
                mdx_note_equations.push(MdxNoteEquationModel {
                    mdx_note_file_path: item.mdx.file_path.clone(),
                    equation_id: eq.equation_id.unwrap(),
                })
            } else {
                log::error!("Attempted to link an equation without a user defined id.")
            }
        }
        for t in item.tags.clone() {
            tags.push(t.clone());
            mdx_note_tags.push(MdxNoteTagModel {
                mdx_note_file_path: item.mdx.file_path.clone(),
                tag_value: t.value,
            })
        }
        if item.front_matter.subject.is_some() {
            let s = item.front_matter.subject.as_ref().unwrap();
            subjects.push(s.clone());
            mdx_note_subjects.push(MdxNoteSubjectModel {
                mdx_note_file_path: item.mdx.file_path.clone(),
                subject_value: s.value.clone(),
            })
        }

        if item.front_matter.topic.is_some() {
            let t = item.front_matter.topic.as_ref().unwrap();
            topics.push(t.clone());
            mdx_note_topics.push(MdxNoteTopicModel {
                mdx_note_file_path: item.mdx.file_path.clone(),
                topic_value: t.value.clone(),
            })
        }
    }
    // Once everything is sorted and joining tables are created, save everything.
    EquationEntity::save_many(db, equations).await?;
    MdxNoteEquationEntity::save_many(db, mdx_note_equations).await?;
    TagEntity::save_many(db, tags).await?;
    SubjectEntity::create_many(db, subjects).await?;
    TopicEntity::create_many(db, topics).await?;
    MdxNoteTagEntity::create_many(db, mdx_note_tags).await?;
    MdxNoteSubjectEntity::create_many(db, mdx_note_subjects).await?;
    MdxNoteTopicEntity::create_many(db, mdx_note_topics).await?;
    MdxNoteEntity::save_many(db, notes).await?;
    FrontMatterEntity::save_many(db, front_matter).await?;
    Ok(())
}
