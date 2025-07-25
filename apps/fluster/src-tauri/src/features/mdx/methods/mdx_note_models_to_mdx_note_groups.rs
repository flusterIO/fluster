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
            front_matter_tag_entity::FrontMatterTagEntity,
            mdx_note_bib_entry_entity::MdxNoteBibEntryEntity,
            mdx_note_dictionary_entry_entity::MdxNoteDictionaryEntryEntity,
            mdx_note_equation_entity::MdxNoteEquationEntity, mdx_note_group::MdxNoteGroup,
            mdx_note_link_entity::MdxNoteLinkEntity, mdx_note_link_model::MdxNoteLinkModel,
            mdx_note_model::MdxNoteModel, mdx_note_subject_entity::MdxNoteSubjectEntity,
            mdx_note_tag_entity::MdxNoteTagEntity, mdx_note_topic_entity::MdxNoteTopicEntity,
        },
    },
};

use crossbeam_channel::unbounded;
use rayon::prelude::*;

// TODO: Parallize the shit out of this.
// TODO: The dictionaryEntry model is being cleaned on each sync now. There's no need for the
// joining table either in 1-1 relationships. Get rid of the MdxNoteDictionaryEntry table all
// together, and replace it with an `mdx_source` field in the DictionaryEntryModel struct that can
// resolve to a filepath for local notes.
pub async fn mdx_note_models_to_mdx_note_groups(
    db: &FlusterDb<'_>,
    models: Vec<MdxNoteModel>,
) -> FlusterResult<Vec<MdxNoteGroup>> {
    let file_paths = models.iter().map(|x| x.file_path.clone()).collect();
    let res = tokio::try_join!(
        MdxNoteTagEntity::get_by_file_paths(db, &file_paths),
        FrontMatterEntity::get_by_file_paths(db, &file_paths),
        FrontMatterTagEntity::get_by_file_paths(db, &file_paths),
        MdxNoteEquationEntity::get_by_file_paths(db, &file_paths),
        MdxNoteBibEntryEntity::get_by_file_paths(db, &file_paths),
        MdxNoteDictionaryEntryEntity::get_by_file_paths(db, &file_paths),
        MdxNoteTopicEntity::get_by_file_paths(db, &file_paths),
        MdxNoteSubjectEntity::get_by_file_paths(db, &file_paths),
        MdxNoteLinkEntity::get_by_file_paths_from(db, &file_paths)
    );

    if res.is_err() {
        return Err(res.err().unwrap());
    }

    let (
        mdx_note_tags,
        front_matter,
        front_matter_tags,
        mdx_note_equations,
        mdx_note_bib_entries,
        mdx_note_dictionary_entries,
        mdx_note_topics,
        mdx_note_subjects,
        mdx_note_links,
    ) = res.unwrap();

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
        DictionaryEntryEntity::get_all(db,),
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

    // After all data has been gathered, collect it here.

    models.par_iter().for_each(|model| {
        let (note_link_sender, note_link_receiver) = unbounded::<MdxNoteLinkModel>();
        for note_link in mdx_note_links.clone() {
            if note_link.mdx_note_file_path_from == model.file_path {
                if let Err(note_link_error) = note_link_sender.send(note_link).map_err(|e| {
                    println!("Error: {:?}", e);
                    FlusterError::FailToGatherMdxGroups
                }) {
                    let _ = error_sender.send(note_link_error);
                }
            }
        }
        drop(note_link_sender);
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
        drop(equation_sender);
        // // -- Citations --
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

        drop(citation_sender);

        // // -- Dictionary Entries --
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
        drop(dictionary_sender);

        let (front_matter_tag_sender, front_matter_tag_receiver) =
            unbounded::<SharedTaggableModel>();
        for front_matter_tag in front_matter_tags.clone() {
            if front_matter_tag.mdx_note_file_path == model.file_path {
                if let Some(tag_item) = tags
                    .par_iter()
                    .find_any(|x| x.value == front_matter_tag.tag_value)
                {
                    let _ = front_matter_tag_sender.send(tag_item.clone());
                }
            }
        }
        drop(front_matter_tag_sender);

        let _base_front_matter = front_matter
            .par_iter()
            .find_first(|x| x.mdx_note_file_path == model.file_path);

        if _base_front_matter.is_none() {
            let _ = error_sender.send(FlusterError::FailToFindById);
            return;
        };

        let base_front_matter = _base_front_matter.unwrap().clone();

        let subject = match base_front_matter.subject {
            None => None,
            Some(x) => subjects.iter().find(|y| x == y.value),
        };

        let topic = match base_front_matter.topic {
            None => None,
            Some(x) => topics.iter().find(|y| x == y.value),
        };

        let (tag_sender, tag_receiver) = unbounded::<SharedTaggableModel>();
        for tag in mdx_note_tags.clone() {
            if tag.mdx_note_file_path == model.file_path {
                if let Some(tag_item) = tags.par_iter().find_any(|x| x.value == tag.tag_value) {
                    let _ = tag_sender.send(tag_item.clone());
                }
            }
        }

        drop(tag_sender);

        let front_matter_tags = front_matter_tag_receiver
            .iter()
            .collect::<Vec<SharedTaggableModel>>();

        let front_matter = FrontMatterModel {
            id: base_front_matter.id,
            mdx_note_file_path: base_front_matter.mdx_note_file_path,
            user_provided_id: base_front_matter.user_provided_id,
            title: base_front_matter.title,
            summary: base_front_matter.summary,
            list_id: base_front_matter.list_id,
            list_index: base_front_matter.list_index,
            tags: front_matter_tags,
            subject: subject.cloned(),
            topic: topic.cloned(),
        };
        let equations = equation_receiver.iter().collect::<Vec<EquationModel>>();
        let citations = citation_receiver.iter().collect::<Vec<BibEntryModel>>();
        let dictionary_entries = dictionary_receiver
            .iter()
            .collect::<Vec<DictionaryEntryModel>>();
        let tags = tag_receiver.iter().collect::<Vec<SharedTaggableModel>>();
        let note_links = note_link_receiver.iter().collect::<Vec<MdxNoteLinkModel>>();
        if let Err(mdx_note_group_res) = sender
            .send(MdxNoteGroup {
                mdx: model.clone(),
                tags,
                front_matter,
                equations,
                citations,
                dictionary_entries,
                note_links,
            })
            .map_err(|e| {
                println!("Error: {:?}", e);
                FlusterError::FailToGatherMdxGroups
            })
        {
            let _ = error_sender.send(mdx_note_group_res);
        }
    });

    drop(sender);
    drop(error_sender);

    if let Some(err) = error_receiver.iter().next() {
        return Err(err);
    }
    let mut items: Vec<MdxNoteGroup> = Vec::new();
    for x in receiver.iter() {
        items.push(x)
    }

    Ok(items)
}
