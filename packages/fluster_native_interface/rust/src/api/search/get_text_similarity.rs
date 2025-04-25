use strsim::jaro_winkler;

#[flutter_rust_bridge::frb(sync)]
pub fn get_text_similarity(a: String, b: String) -> f64 {
    jaro_winkler(&a, &b)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn returns_no_similarity_if_not_similar() {
        let val = get_text_similarity("abcdefg".to_string(), "hijklmnop".to_string());
        println!("{}", val);
        assert!(val < 0.05);

        // assert_eq!(result, 4);
    }

    #[test]
    fn returns_similarity_if_similar() {
        let val = get_text_similarity("abcdefg".to_string(), "abcdefg".to_string());
        println!("{}", val);
        assert!(val > 0.95);

        // assert_eq!(result, 4);
    }
}
