
--
-- Notes
--

CREATE TABLE mdx_note (
    id SERIAL PRIMARY KEY,
-- Not varchar to allow for an indefinite length.
    file_path TEXT,
-- The notes raw mdx content with the front matter removed.
    raw_body TEXT,
-- The time the file was created.
    ctime TIMESTAMP,
-- The time the file was last modified.
    mtime DATETIME,
-- The time of last access. This might be unreliable if the file is being accessed as part of the sync script.
    atime DATETIME,
);


CREATE TABLE test_table (
    id SERIAL PRIMARY KEY
);
--
-- Bibliography 
--

CREATE TABLE reading_list ( 
    id SERIAL PRIMARY KEY,
);

CREATE TABLE reading_list_bib_entry_join (
    id SERIAL PRIMARY KEY,
    bib_entry_id INT,
    CONSTRAINT fk_bib_entry 
        FOREIGN KEY(bib_entry_id)
           REFERENCES bib_entry(id)
    reading_list_id INT,
    CONSTRAINT fk_reading_list 
        FOREIGN KEY(reading_list_id)
           REFERENCES reading_list(id)
);

CREATE TABLE bib_entry (
    id SERIAL PRIMARY KEY,
-- The notes raw mdx content with the front matter removed.
    data JSON,
);
