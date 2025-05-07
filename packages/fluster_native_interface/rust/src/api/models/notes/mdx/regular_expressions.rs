use flutter_rust_bridge::frb;
use regex::Regex;

#[frb(ignore)]
pub fn get_equation_tag_regular_expression() -> Regex {
    Regex::new(r"\[\[eq:(?<body>[^\]]+)\]\]").unwrap()
}

#[frb(ignore)]
pub fn get_note_id_link_regular_expression() -> Regex {
    Regex::new(r"\[(?<textContent>[^\]]+)\]\(noteId:(?<noteId>[^\)]+)\)").unwrap()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn equation_tag_regex_parses_properly() {
        let string = "My tag is [[eq:myEquationId]]";
        let fail_string = "My tag is [[eq-hereIsMyTag]]";
        let r = get_equation_tag_regular_expression();
        assert!(r.is_match(string), "Matches string properly.");
        assert!(!r.is_match(fail_string), "Doesn't match string properly.");
        let m = r.captures(string).expect("Parses string without error.");
        assert!(&m["body"] == "myEquationId", "Finds id successfully.");
        // assert_eq!(result, 4);
    }

    #[test]
    fn note_id_link_regex_parses_properly() {
        let string = "My tag is [my text](noteId:myNoteId)";
        let fail_string = "My tag is [My text](http://noteId.com)";
        let r = get_note_id_link_regular_expression();
        assert!(r.is_match(string), "Matches string properly.");
        assert!(!r.is_match(fail_string), "Doesn't match string properly.");
        let m = r.captures(string).expect("Parses string without error.");
        assert!(
            &m["textContent"] == "my text",
            "Finds text content successfully."
        );
        assert!(&m["noteId"] == "myNoteId", "Finds id successfully.");
        // assert_eq!(result, 4);
    }
}
