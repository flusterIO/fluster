use regex::Regex;

// RESUME: Come back here and make sure all regular expressions are working, and add these to the
// parsing script.
pub fn get_tag_regular_expression() -> Regex {
    Regex::new(r"\[\[\#(<body>[^\#]*)\]\]").unwrap()
}

pub fn get_equation_tag_regular_expression() -> Regex {
    Regex::new(r"\[\[eq:(<body>[\s]*)\]\]").unwrap()
}

pub fn get_note_id_link_regular_expression() -> Regex {
    Regex::new(r"\[(<textContent>[^\]]+)\]noteId:(<noteId>[\s]*)\]\]").unwrap()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn tag_regex_parses_properly() {
        let string = "My tag is [[#hereIsMyTag]]";
        let fail_string = "My tag is [#hereIsMyTag]";
        let r = get_tag_regular_expression();
        assert!(r.is_match(string), "Matches string properly.");
        assert!(!r.is_match(fail_string), "Doesn't match string properly.");
        // assert_eq!(result, 4);
    }

    #[test]
    fn equation_tag_regex_parses_properly() {
        let string = "My tag is [[eq:myEquationId]]";
        let fail_string = "My tag is [[eq-hereIsMyTag]]";
        let r = get_tag_regular_expression();
        assert!(r.is_match(string), "Matches string properly.");
        assert!(!r.is_match(fail_string), "Doesn't match string properly.");
        // assert_eq!(result, 4);
    }
}
