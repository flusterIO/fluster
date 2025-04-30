use regex::Regex;

pub fn get_tag_regular_expression() -> Regex {
    Regex::new(r"\[\[#(?<body>[^#]+)\]\]").unwrap()
}

pub struct Tag {
    pub value: String,
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
        let m = r.captures(string).expect("Parses string without error.");
        assert!(&m["body"] == "hereIsMyTag", "Finds id successfully.");
    }
}
