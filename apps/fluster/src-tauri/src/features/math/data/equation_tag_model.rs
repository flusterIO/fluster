pub struct EquationTagModel {
    /// This mapes to the id field in the equation struct, *not* the equation_id field.
    pub equation_id: String,
    /// This is the value field in the tag. It feels a little weird to ccess it that way, but
    /// it will be unique.
    pub tag_value: String,
}
