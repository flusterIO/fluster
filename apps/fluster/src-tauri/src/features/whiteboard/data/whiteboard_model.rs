use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Type, Deserialize, Serialize, Clone)]
pub struct WhiteboardModel {
    /// A user provided id given to the Whiteboard component.
    pub id: String,
    /// The stingified json state of the whiteboard..
    pub state: String,
    /// A string used to specify the whiteboard in search results and such.
    pub label: String,
    /// Time the whiteboard was created.
    pub ctime: String,
    /// Time the whiteboard was last updated..
    pub utime: String,
}
