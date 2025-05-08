-- ------------------------------
-- OPTION
-- ------------------------------

OPTION IMPORT;

-- ------------------------------
-- TABLE: equations
-- ------------------------------

DEFINE TABLE equations TYPE NORMAL SCHEMAFULL PERMISSIONS NONE;

DEFINE FIELD body ON equations TYPE string PERMISSIONS FULL;
DEFINE FIELD code ON equations TYPE string PERMISSIONS FULL;
DEFINE FIELD desc ON equations TYPE string PERMISSIONS FULL;
DEFINE FIELD eq_id ON equations TYPE string PERMISSIONS FULL;
DEFINE FIELD label ON equations TYPE string PERMISSIONS FULL;

DEFINE INDEX label_index ON equations FIELDS label SEARCH ANALYZER simple BM25(1.2,0.75);
DEFINE INDEX desc_index ON equations FIELDS desc SEARCH ANALYZER simple BM25(1.2,0.75);


-- ------------------------------
-- TABLE: front_matter
-- ------------------------------

DEFINE TABLE front_matter TYPE NORMAL SCHEMALESS PERMISSIONS NONE;

DEFINE FIELD note_id ON front_matter TYPE string PERMISSIONS FULL;
DEFINE FIELD summary ON front_matter TYPE string PERMISSIONS FULL;
DEFINE FIELD title ON front_matter TYPE string PERMISSIONS FULL;

DEFINE INDEX title_index ON front_matter FIELDS title SEARCH ANALYZER simple BM25(1.2,0.75);



-- ------------------------------
-- TABLE: front_matter_note_relationship
-- ------------------------------

DEFINE TABLE front_matter_note_relationship TYPE RELATION IN mdx_notes OUT front_matter SCHEMAFULL PERMISSIONS NONE;

DEFINE FIELD in ON front_matter_note_relationship TYPE record<mdx_notes> PERMISSIONS FULL;
DEFINE FIELD out ON front_matter_note_relationship TYPE record<front_matter> PERMISSIONS FULL;



-- ------------------------------
-- TABLE: mdx_notes
-- ------------------------------

DEFINE TABLE mdx_notes TYPE NORMAL SCHEMALESS PERMISSIONS NONE;

DEFINE FIELD body ON mdx_notes TYPE string PERMISSIONS FULL;
DEFINE FIELD file_path ON mdx_notes TYPE string PERMISSIONS FULL;
DEFINE FIELD ctime ON mdx_notes TYPE datetime PERMISSIONS FULL;
DEFINE FIELD mtime ON mdx_notes TYPE datetime PERMISSIONS FULL;
DEFINE FIELD atime ON mdx_notes TYPE datetime PERMISSIONS FULL;

DEFINE INDEX body_index ON mdx_notes FIELDS body SEARCH ANALYZER simple BM25(1.2,0.75);
DEFINE INDEX unique_file_path ON mdx_notes FIELDS file_path UNIQUE;



-- ------------------------------
-- TABLE: note_equations
-- ------------------------------

DEFINE TABLE note_equations TYPE RELATION IN mdx_notes OUT equations SCHEMAFULL PERMISSIONS NONE;

DEFINE FIELD in ON note_equations TYPE record<mdx_notes> PERMISSIONS FULL;
DEFINE FIELD out ON note_equations TYPE record<equations> PERMISSIONS FULL;



-- ------------------------------
-- TABLE: note_tags
-- ------------------------------

DEFINE TABLE note_tags TYPE RELATION IN mdx_notes | equations OUT tags SCHEMAFULL PERMISSIONS NONE;

DEFINE FIELD in ON note_tags TYPE record<mdx_notes | equations> PERMISSIONS FULL;
DEFINE FIELD out ON note_tags TYPE record<tags> PERMISSIONS FULL;



-- ------------------------------
-- TABLE: tags
-- ------------------------------

DEFINE TABLE tags TYPE NORMAL SCHEMAFULL PERMISSIONS NONE;

DEFINE FIELD `value` ON tags TYPE string PERMISSIONS FULL;
DEFINE FIELD ctime ON tags TYPE datetime PERMISSIONS FULL;

DEFINE INDEX unique_value ON tags FIELDS value UNIQUE;


-- ------------------------------
-- TABLE: subjects 
-- ------------------------------

DEFINE TABLE subjects TYPE NORMAL SCHEMAFULL PERMISSIONS NONE;

DEFINE FIELD `value` ON subjects TYPE string PERMISSIONS FULL;
DEFINE FIELD ctime ON subjects TYPE datetime PERMISSIONS FULL;

DEFINE INDEX unique_value ON subjects FIELDS value UNIQUE;



-- ------------------------------
-- TABLE: topics
-- ------------------------------

DEFINE TABLE topics TYPE NORMAL SCHEMAFULL PERMISSIONS NONE;

DEFINE FIELD `value` ON topics TYPE string PERMISSIONS FULL;
DEFINE FIELD ctime ON topics TYPE datetime PERMISSIONS FULL;

DEFINE INDEX unique_value ON topics FIELDS value UNIQUE;
