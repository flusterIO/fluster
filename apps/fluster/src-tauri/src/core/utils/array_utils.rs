pub struct ArrayOverlapResult<T> {
    pub save: Vec<T>,
    pub remove: Vec<T>,
}

pub fn handle_array_overlap<T: Clone>(
    new_items: Vec<T>,
    existing_items: Vec<T>,
    is_equal: fn(&T, &T) -> bool,
) -> ArrayOverlapResult<T> {
    let mut save: Vec<T> = Vec::new();
    let mut remove: Vec<T> = Vec::new();
    for item in new_items.clone() {
        let exists = existing_items.iter().any(|x| is_equal(x, &item));
        if !exists {
            save.push(item)
        }
    }

    for item in existing_items {
        let exists = new_items.iter().any(|x| is_equal(x, &item));
        if !exists {
            remove.push(item)
        }
    }
    ArrayOverlapResult { save, remove }
}
