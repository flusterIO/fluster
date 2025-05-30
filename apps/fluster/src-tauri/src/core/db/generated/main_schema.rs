// @generated automatically by Diesel CLI.

diesel::table! {
    /// Representation of the `bib_entry` table.
    ///
    /// (Automatically generated by Diesel.)
    bib_entry (id) {
        /// The `id` column of the `bib_entry` table.
        ///
        /// Its SQL type is `Int4`.
        ///
        /// (Automatically generated by Diesel.)
        id -> Int4,
        /// The `data` column of the `bib_entry` table.
        ///
        /// Its SQL type is `Json`.
        ///
        /// (Automatically generated by Diesel.)
        data -> Json,
        /// The `pdf_path` column of the `bib_entry` table.
        ///
        /// Its SQL type is `Nullable<Text>`.
        ///
        /// (Automatically generated by Diesel.)
        pdf_path -> Nullable<Text>,
        /// The `read` column of the `bib_entry` table.
        ///
        /// Its SQL type is `Bool`.
        ///
        /// (Automatically generated by Diesel.)
        read -> Bool,
    }
}

diesel::table! {
    /// Representation of the `equation` table.
    ///
    /// (Automatically generated by Diesel.)
    equation (id) {
        /// The `id` column of the `equation` table.
        ///
        /// Its SQL type is `Int4`.
        ///
        /// (Automatically generated by Diesel.)
        id -> Int4,
        /// The `content` column of the `equation` table.
        ///
        /// Its SQL type is `Text`.
        ///
        /// (Automatically generated by Diesel.)
        content -> Text,
        /// The `label` column of the `equation` table.
        ///
        /// Its SQL type is `Text`.
        ///
        /// (Automatically generated by Diesel.)
        label -> Text,
        /// The `desc` column of the `equation` table.
        ///
        /// Its SQL type is `Text`.
        ///
        /// (Automatically generated by Diesel.)
        desc -> Text,
        /// The `eq_id` column of the `equation` table.
        ///
        /// Its SQL type is `Nullable<Varchar>`.
        ///
        /// (Automatically generated by Diesel.)
        #[max_length = 100]
        eq_id -> Nullable<Varchar>,
    }
}

diesel::table! {
    /// Representation of the `equation_mdx_note_join` table.
    ///
    /// (Automatically generated by Diesel.)
    equation_mdx_note_join (mdx_note_id, equation_id) {
        /// The `mdx_note_id` column of the `equation_mdx_note_join` table.
        ///
        /// Its SQL type is `Int4`.
        ///
        /// (Automatically generated by Diesel.)
        mdx_note_id -> Int4,
        /// The `equation_id` column of the `equation_mdx_note_join` table.
        ///
        /// Its SQL type is `Int4`.
        ///
        /// (Automatically generated by Diesel.)
        equation_id -> Int4,
    }
}

diesel::table! {
    /// Representation of the `equation_snippet_join` table.
    ///
    /// (Automatically generated by Diesel.)
    equation_snippet_join (equation_id, snippet_id) {
        /// The `equation_id` column of the `equation_snippet_join` table.
        ///
        /// Its SQL type is `Int4`.
        ///
        /// (Automatically generated by Diesel.)
        equation_id -> Int4,
        /// The `snippet_id` column of the `equation_snippet_join` table.
        ///
        /// Its SQL type is `Int4`.
        ///
        /// (Automatically generated by Diesel.)
        snippet_id -> Int4,
    }
}

diesel::table! {
    /// Representation of the `front_matter` table.
    ///
    /// (Automatically generated by Diesel.)
    front_matter (id) {
        /// The `id` column of the `front_matter` table.
        ///
        /// Its SQL type is `Int4`.
        ///
        /// (Automatically generated by Diesel.)
        id -> Int4,
        /// The `title` column of the `front_matter` table.
        ///
        /// Its SQL type is `Text`.
        ///
        /// (Automatically generated by Diesel.)
        title -> Text,
        /// The `summary` column of the `front_matter` table.
        ///
        /// Its SQL type is `Nullable<Text>`.
        ///
        /// (Automatically generated by Diesel.)
        summary -> Nullable<Text>,
        /// The `mdx_note_id` column of the `front_matter` table.
        ///
        /// Its SQL type is `Int4`.
        ///
        /// (Automatically generated by Diesel.)
        mdx_note_id -> Int4,
        /// The `user_provided_id` column of the `front_matter` table.
        ///
        /// Its SQL type is `Nullable<Varchar>`.
        ///
        /// (Automatically generated by Diesel.)
        #[max_length = 50]
        user_provided_id -> Nullable<Varchar>,
    }
}

diesel::table! {
    /// Representation of the `front_matter_taggable_join` table.
    ///
    /// (Automatically generated by Diesel.)
    front_matter_taggable_join (tag_id, front_matter_id) {
        /// The `tag_id` column of the `front_matter_taggable_join` table.
        ///
        /// Its SQL type is `Int4`.
        ///
        /// (Automatically generated by Diesel.)
        tag_id -> Int4,
        /// The `front_matter_id` column of the `front_matter_taggable_join` table.
        ///
        /// Its SQL type is `Int4`.
        ///
        /// (Automatically generated by Diesel.)
        front_matter_id -> Int4,
    }
}

diesel::table! {
    /// Representation of the `log` table.
    ///
    /// (Automatically generated by Diesel.)
    log (id) {
        /// The `id` column of the `log` table.
        ///
        /// Its SQL type is `Int4`.
        ///
        /// (Automatically generated by Diesel.)
        id -> Int4,
        /// The `msg` column of the `log` table.
        ///
        /// Its SQL type is `Varchar`.
        ///
        /// (Automatically generated by Diesel.)
        #[max_length = 255]
        msg -> Varchar,
        /// The `ctime` column of the `log` table.
        ///
        /// Its SQL type is `Timestamp`.
        ///
        /// (Automatically generated by Diesel.)
        ctime -> Timestamp,
    }
}

diesel::table! {
    /// Representation of the `mdx_note` table.
    ///
    /// (Automatically generated by Diesel.)
    mdx_note (id) {
        /// The `id` column of the `mdx_note` table.
        ///
        /// Its SQL type is `Int4`.
        ///
        /// (Automatically generated by Diesel.)
        id -> Int4,
        /// The `file_path` column of the `mdx_note` table.
        ///
        /// Its SQL type is `Nullable<Text>`.
        ///
        /// (Automatically generated by Diesel.)
        file_path -> Nullable<Text>,
        /// The `raw_body` column of the `mdx_note` table.
        ///
        /// Its SQL type is `Text`.
        ///
        /// (Automatically generated by Diesel.)
        raw_body -> Text,
        /// The `ctime` column of the `mdx_note` table.
        ///
        /// Its SQL type is `Nullable<Timestamp>`.
        ///
        /// (Automatically generated by Diesel.)
        ctime -> Nullable<Timestamp>,
        /// The `mtime` column of the `mdx_note` table.
        ///
        /// Its SQL type is `Nullable<Timestamp>`.
        ///
        /// (Automatically generated by Diesel.)
        mtime -> Nullable<Timestamp>,
        /// The `atime` column of the `mdx_note` table.
        ///
        /// Its SQL type is `Nullable<Timestamp>`.
        ///
        /// (Automatically generated by Diesel.)
        atime -> Nullable<Timestamp>,
        /// The `last_sync` column of the `mdx_note` table.
        ///
        /// Its SQL type is `Timestamp`.
        ///
        /// (Automatically generated by Diesel.)
        last_sync -> Timestamp,
    }
}

diesel::table! {
    /// Representation of the `mdx_note_taggable_join` table.
    ///
    /// (Automatically generated by Diesel.)
    mdx_note_taggable_join (mdx_note_id, tag_id) {
        /// The `mdx_note_id` column of the `mdx_note_taggable_join` table.
        ///
        /// Its SQL type is `Int4`.
        ///
        /// (Automatically generated by Diesel.)
        mdx_note_id -> Int4,
        /// The `tag_id` column of the `mdx_note_taggable_join` table.
        ///
        /// Its SQL type is `Int4`.
        ///
        /// (Automatically generated by Diesel.)
        tag_id -> Int4,
    }
}

diesel::table! {
    /// Representation of the `reading_list` table.
    ///
    /// (Automatically generated by Diesel.)
    reading_list (id) {
        /// The `id` column of the `reading_list` table.
        ///
        /// Its SQL type is `Int4`.
        ///
        /// (Automatically generated by Diesel.)
        id -> Int4,
        /// The `desc` column of the `reading_list` table.
        ///
        /// Its SQL type is `Text`.
        ///
        /// (Automatically generated by Diesel.)
        desc -> Text,
        /// The `label` column of the `reading_list` table.
        ///
        /// Its SQL type is `Varchar`.
        ///
        /// (Automatically generated by Diesel.)
        #[max_length = 30]
        label -> Varchar,
        /// The `ctime` column of the `reading_list` table.
        ///
        /// Its SQL type is `Timestamp`.
        ///
        /// (Automatically generated by Diesel.)
        ctime -> Timestamp,
    }
}

diesel::table! {
    /// Representation of the `reading_list_bib_entry_join` table.
    ///
    /// (Automatically generated by Diesel.)
    reading_list_bib_entry_join (bib_entry_id, reading_list_id) {
        /// The `bib_entry_id` column of the `reading_list_bib_entry_join` table.
        ///
        /// Its SQL type is `Int4`.
        ///
        /// (Automatically generated by Diesel.)
        bib_entry_id -> Int4,
        /// The `reading_list_id` column of the `reading_list_bib_entry_join` table.
        ///
        /// Its SQL type is `Int4`.
        ///
        /// (Automatically generated by Diesel.)
        reading_list_id -> Int4,
    }
}

diesel::table! {
    /// Representation of the `snippet` table.
    ///
    /// (Automatically generated by Diesel.)
    snippet (id) {
        /// The `id` column of the `snippet` table.
        ///
        /// Its SQL type is `Int4`.
        ///
        /// (Automatically generated by Diesel.)
        id -> Int4,
        /// The `label` column of the `snippet` table.
        ///
        /// Its SQL type is `Text`.
        ///
        /// (Automatically generated by Diesel.)
        label -> Text,
        /// The `desc` column of the `snippet` table.
        ///
        /// Its SQL type is `Text`.
        ///
        /// (Automatically generated by Diesel.)
        desc -> Text,
        /// The `lang` column of the `snippet` table.
        ///
        /// Its SQL type is `Varchar`.
        ///
        /// (Automatically generated by Diesel.)
        #[max_length = 20]
        lang -> Varchar,
        /// The `body` column of the `snippet` table.
        ///
        /// Its SQL type is `Text`.
        ///
        /// (Automatically generated by Diesel.)
        body -> Text,
    }
}

diesel::table! {
    /// Representation of the `taggable` table.
    ///
    /// (Automatically generated by Diesel.)
    taggable (id) {
        /// The `id` column of the `taggable` table.
        ///
        /// Its SQL type is `Int4`.
        ///
        /// (Automatically generated by Diesel.)
        id -> Int4,
        /// The `value` column of the `taggable` table.
        ///
        /// Its SQL type is `Varchar`.
        ///
        /// (Automatically generated by Diesel.)
        #[max_length = 50]
        value -> Varchar,
        /// The `tag_type` column of the `taggable` table.
        ///
        /// Its SQL type is `Varchar`.
        ///
        /// (Automatically generated by Diesel.)
        #[max_length = 7]
        tag_type -> Varchar,
    }
}

diesel::joinable!(equation_mdx_note_join -> equation (equation_id));
diesel::joinable!(equation_mdx_note_join -> mdx_note (mdx_note_id));
diesel::joinable!(equation_snippet_join -> equation (equation_id));
diesel::joinable!(equation_snippet_join -> snippet (snippet_id));
diesel::joinable!(front_matter -> mdx_note (mdx_note_id));
diesel::joinable!(front_matter_taggable_join -> front_matter (front_matter_id));
diesel::joinable!(front_matter_taggable_join -> taggable (tag_id));
diesel::joinable!(mdx_note_taggable_join -> mdx_note (mdx_note_id));
diesel::joinable!(mdx_note_taggable_join -> taggable (tag_id));
diesel::joinable!(reading_list_bib_entry_join -> bib_entry (bib_entry_id));
diesel::joinable!(reading_list_bib_entry_join -> reading_list (reading_list_id));

diesel::allow_tables_to_appear_in_same_query!(
    bib_entry,
    equation,
    equation_mdx_note_join,
    equation_snippet_join,
    front_matter,
    front_matter_taggable_join,
    log,
    mdx_note,
    mdx_note_taggable_join,
    reading_list,
    reading_list_bib_entry_join,
    snippet,
    taggable,
);
