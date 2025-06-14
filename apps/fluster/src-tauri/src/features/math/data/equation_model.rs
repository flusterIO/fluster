use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Deserialize, Type, Clone)]
pub struct EquationModel {
    /// This is the traditional id field, generated by uuid.
    pub id: String,
    /// The equation_id field is the 'id' field as provided from the user. This is used to
    /// reference equations throughout their notes in a way that makes sense to the user as
    /// opposed to an arbitrary string.
    pub equation_id: Option<String>,
    /// The title or label for the equation.
    pub label: String,
    /// The equation latex string.
    pub body: String,
    pub desc: String,
    /// Time snippet is initially created.
    pub ctime: String,
    /// Time snippet is last updated.
    pub utime: String,
}
