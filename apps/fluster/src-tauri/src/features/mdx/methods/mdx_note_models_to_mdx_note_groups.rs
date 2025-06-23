use std::ops::Index;

use crate::{
    core::{
        models::taggable::{
            shared_taggable_model::SharedTaggableModel, subject_entity::SubjectEntity,
            tag_entity::TagEntity, topic_entity::TopicEntity,
        },
        types::{
            errors::errors::{FlusterError, FlusterResult},
            FlusterDb,
        },
    },
    features::{
        bibliography::data::{bib_entry_entity::BibEntryEntity, bib_entry_model::BibEntryModel},
        dictionary::{
            dictionary_entry_entity::DictionaryEntryEntity,
            dictionary_entry_model::DictionaryEntryModel,
        },
        math::data::{equation_entity::EquationEntity, equation_model::EquationModel},
        mdx::data::{
            front_matter_entity::FrontMatterEntity, front_matter_model::FrontMatterModel,
            mdx_note_bib_entry_entity::MdxNoteBibEntryEntity,
            mdx_note_dictionary_entry_entity::MdxNoteDictionaryEntity,
            mdx_note_equation_entity::MdxNoteEquationEntity, mdx_note_group::MdxNoteGroup,
            mdx_note_model::MdxNoteModel, mdx_note_subject_entity::MdxNoteSubjectEntity,
            mdx_note_tag_entity::MdxNoteTagEntity, mdx_note_topic_entity::MdxNoteTopicEntity,
        },
    },
};

use crossbeam_channel::unbounded;
use rayon::prelude::*;

// TODO: Parallize the shit out of this.
pub async fn mdx_note_models_to_mdx_note_groups(
    db: &FlusterDb<'_>,
    models: Vec<MdxNoteModel>,
) -> FlusterResult<Vec<MdxNoteGroup>> {
    let file_paths = models.iter().map(|x| x.file_path.clone()).collect();
    let res = tokio::try_join!(
        MdxNoteTagEntity::get_by_file_paths(db, &file_paths),
        FrontMatterEntity::get_by_file_paths(db, &file_paths),
        MdxNoteEquationEntity::get_by_file_paths(db, &file_paths),
        MdxNoteBibEntryEntity::get_by_file_paths(db, &file_paths),
        MdxNoteDictionaryEntity::get_by_file_paths(db, &file_paths),
        MdxNoteTopicEntity::get_by_file_paths(db, &file_paths),
        MdxNoteSubjectEntity::get_by_file_paths(db, &file_paths),
    );

    if res.is_err() {
        return Err(res.err().unwrap());
    }

    let (
        mdx_note_tags,
        front_matter,
        mdx_note_equations,
        mdx_note_bib_entries,
        mdx_note_dictionary_entries,
        mdx_note_topics,
        mdx_note_subjects,
    ) = res.unwrap();
    let l = front_matter.iter().len();
    if l != 1 {
        if l > 1 {
            return Err(FlusterError::DuplicateId);
        } else {
            return Err(FlusterError::FailToFindById);
        }
    }

    let second_res = tokio::try_join!(
        TagEntity::get_by_values(
            db,
            mdx_note_tags.iter().map(|x| x.tag_value.clone()).collect(),
        ),
        EquationEntity::get_by_ids(
            db,
            mdx_note_equations
                .iter()
                .map(|x| x.equation_id.clone())
                .collect(),
        ),
        BibEntryEntity::get_by_ids(
            db,
            mdx_note_bib_entries
                .iter()
                .map(|x| x.bib_entry_id.clone())
                .collect(),
        ),
        DictionaryEntryEntity::get_by_ids(
            db,
            mdx_note_bib_entries
                .iter()
                .map(|x| x.bib_entry_id.clone())
                .collect(),
        ),
        TopicEntity::get_by_values(
            db,
            mdx_note_topics
                .iter()
                .map(|x| x.topic_value.clone())
                .collect(),
        ),
        SubjectEntity::get_by_values(
            db,
            mdx_note_subjects
                .iter()
                .map(|x| x.subject_value.clone())
                .collect(),
        ),
    );

    if second_res.is_err() {
        return Err(second_res.err().unwrap());
    }

    let (tags, equations, bib_entries, dictionary_entries, topics, subjects) = second_res.unwrap();

    let (sender, receiver) = unbounded::<MdxNoteGroup>();

    let (error_sender, error_receiver) = unbounded::<FlusterError>();

    if let Some(err) = error_receiver.iter().next() {
        return Err(err);
    }

    // After all data has been gathered, collect it here.

    models.par_iter().for_each(|model| {
        // -- Equations --
        let (equation_sender, equation_receiver) = unbounded::<EquationModel>();
        for eq in mdx_note_equations.clone() {
            if eq.mdx_note_file_path == model.file_path {
                // Find a single match for this single joining entity
                if let Some(matched_equation) =
                    equations.par_iter().find_any(|x| x.id == eq.equation_id)
                {
                    if let Err(equation_sender_err) =
                        equation_sender.send(matched_equation.clone()).map_err(|e| {
                            println!("Error: {:?}", e);
                            FlusterError::FailToGatherMdxGroups
                        })
                    {
                        let _ = error_sender.send(equation_sender_err);
                    }
                }
            }
        }
        // -- Citations --
        let (citation_sender, citation_receiver) = unbounded::<BibEntryModel>();
        for cit in mdx_note_bib_entries.clone() {
            if cit.mdx_note_file_path == model.file_path {
                // Find a single match for this single joining entity
                if let Some(matched_citation) = bib_entries
                    .par_iter()
                    .find_any(|x| x.id == cit.bib_entry_id)
                {
                    if let Err(citation_sender_err) =
                        citation_sender.send(matched_citation.clone()).map_err(|e| {
                            println!("Error: {:?}", e);
                            FlusterError::FailToGatherMdxGroups
                        })
                    {
                        let _ = error_sender.send(citation_sender_err);
                    }
                }
            }
        }

        // -- Dictionary Entries --
        let (dictionary_sender, dictionary_receiver) = unbounded::<DictionaryEntryModel>();
        for cit in mdx_note_dictionary_entries.clone() {
            if cit.mdx_note_file_path == model.file_path {
                // Find a single match for this single joining entity
                if let Some(matched_dictionary_entry) = dictionary_entries
                    .par_iter()
                    .find_any(|x| x.label == cit.dictionary_entry_label)
                {
                    if let Err(dictionary_res) = dictionary_sender
                        .send(matched_dictionary_entry.clone())
                        .map_err(|e| {
                            println!("Error: {:?}", e);
                            FlusterError::FailToGatherMdxGroups
                        })
                    {
                        let _ = error_sender.send(dictionary_res);
                    }
                }
            }
        }

        let base_front_matter = front_matter.index(0).clone();
        let (front_matter_tag_sender, front_matter_tag_receiver) =
            unbounded::<SharedTaggableModel>();

        let subject = match base_front_matter.subject {
            None => None,
            Some(x) => subjects.iter().find(|y| x == y.value),
        };

        let topic = match base_front_matter.topic {
            None => None,
            Some(x) => topics.iter().find(|y| x == y.value),
        };

        let fm = FrontMatterModel {
            id: base_front_matter.id,
            mdx_note_file_path: base_front_matter.mdx_note_file_path,
            user_provided_id: base_front_matter.user_provided_id,
            title: base_front_matter.title,
            summary: base_front_matter.summary,
            list_id: base_front_matter.list_id,
            list_index: base_front_matter.list_index,
            tags: front_matter_tag_receiver.iter().collect(),
            subject: subject.cloned(),
            topic: topic.cloned(),
        };

        let (tag_sender, tag_receiver) = unbounded::<SharedTaggableModel>();
        for t in mdx_note_tags.clone() {
            if t.mdx_note_file_path == model.file_path {
                if let Some(matched_tag) = tags.par_iter().find_any(|x| x.value == t.tag_value) {
                    if fm.tags.iter().any(|x| x.value == t.tag_value) {
                        if let Err(front_matter_tag_res) = front_matter_tag_sender
                            .send(matched_tag.clone())
                            .map_err(|e| {
                                println!("Error: {:?}", e);
                                FlusterError::FailToGatherMdxGroups
                            })
                        {
                            let _ = error_sender.send(front_matter_tag_res);
                        }
                    } else if let Err(tag_res) = tag_sender.send(matched_tag.clone()).map_err(|e| {
                        println!("Error: {:?}", e);
                        FlusterError::FailToGatherMdxGroups
                    }) {
                        let _ = error_sender.send(tag_res);
                    };
                }
                // if let Some(front_matter_matched_tag) = tags.par_iter()
            }
        }

        // RESUME: Come back here and finish this when battery is charging.
        if let Err(mdx_note_group_res) = sender
            .send(MdxNoteGroup {
                mdx: model.clone(),
                tags: tag_receiver.iter().collect(),
                front_matter: fm,
                equations: equation_receiver.iter().collect(),
                citations: citation_receiver.iter().collect(),
                dictionary_entries: dictionary_receiver.iter().collect(),
            })
            .map_err(|e| {
                println!("Error: {:?}", e);
                FlusterError::FailToGatherMdxGroups
            })
        {
            let _ = error_sender.send(mdx_note_group_res);
        }
    });

    let mut items: Vec<MdxNoteGroup> = Vec::new();
    for x in receiver.iter() {
        items.push(x)
    }

    Ok(items)
    // Get front matter additional entities here.
}
