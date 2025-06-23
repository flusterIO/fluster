use super::shared_taggable_model::SharedTaggableModel;

pub struct TagFromContentResult {
    pub tags: Vec<SharedTaggableModel>,
    pub parsed_content: String,
}
