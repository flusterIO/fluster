# --- Taggables ---

# Tag
DEFINE TABLE tag SCHEMAFULL;
DEFINE FIELD val ON TABLE tag TYPE string;
/// The time this tag was first created.
DEFINE FIELD ctime ON TABLE tag TYPE datetime;
DEFINE INDEX tag_val_unique ON tag COLUMNS val UNIQUE;

# Subject
DEFINE TABLE subject SCHEMAFULL;
DEFINE FIELD val ON TABLE subject TYPE string;
/// The time this subject was first created.
DEFINE FIELD ctime ON TABLE subject TYPE datetime;
DEFINE INDEX subject_val_unique ON subject COLUMNS val UNIQUE;

# Topic
DEFINE TABLE topic SCHEMAFULL;
DEFINE FIELD val ON TABLE topic TYPE string;
/// The time this topic was first created.
DEFINE FIELD ctime ON TABLE topic TYPE datetime;
DEFINE INDEX topic_val_unique ON topic COLUMNS val UNIQUE;

# --- Notes ---

# Front Matter
DEFINE TABLE front_matter SCHEMAFULL;
DEFINE FIELD title ON TABLE front_matter TYPE string;
DEFINE FIELD summary ON TABLE front_matter TYPE string;

# Front Matter joins
DEFINE TABLE tag_front_matter SCHEMAFULL;
DEFINE FIELD tag_id ON TABLE tag_front_matter type record<tag>;
DEFINE FIELD front_matter_id ON TABLE tag_front_matter type record<front_matter>;

# Mdx Notes
DEFINE TABLE mdx_note SCHEMAFULL;
DEFINE FIELD raw_body ON TABLE mdx_note TYPE string;
/// The time a file was last accessed.
DEFINE FIELD atime ON TABLE mdx_note TYPE datetime;
/// The time a file was last modified.
DEFINE FIELD mtime ON TABLE mdx_note TYPE datetime;
/// The time a file was created.
DEFINE FIELD ctime ON TABLE mdx_note TYPE datetime;
DEFINE FIELD front_matter_id ON TABLE mdx_note TYPE record<front_matter>;
// Make sure the relationship is unique.
DEFINE INDEX front_matter_mdx_note_link ON mdx_note COLUMNS front_matter_id UNIQUE;
