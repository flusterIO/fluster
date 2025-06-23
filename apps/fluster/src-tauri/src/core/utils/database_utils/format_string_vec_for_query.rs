pub fn format_string_vec_for_query(items: &Vec<String>) -> String {
    items
        .iter()
        .map(|x| format!("\"{}\"", x))
        .collect::<Vec<String>>()
        .join(", ")
}
