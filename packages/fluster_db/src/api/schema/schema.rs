diesel::table! {
    mdx_note (id) {
        id -> Int4,
        raw_body -> Text,
        file_path -> Text,
        ctime -> Timestamp,
        atime -> Timestamp,
        mtime -> Timestamp,
    }
}
