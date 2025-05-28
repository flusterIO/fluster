CREATE TABLE IF NOT EXISTS log (
    id SERIAL PRIMARY KEY,
    "msg" VARCHAR(255) NOT NULL, 
    ctime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- This needs to be handled as part of the log or init function. The init function will likely be more performant as it will only run once when the app starts. 
-- DELETE FROM log 
-- WHERE ctime < NOW() - INTERVAL '7 days'


CREATE TABLE IF NOT EXISTS tag ( 
    id SERIAL PRIMARY KEY,
    value VARCHAR(50) NOT NULL UNIQUE
);


CREATE TABLE IF NOT EXISTS subject ( 
    id SERIAL PRIMARY KEY,
    value VARCHAR(50) NOT NULL UNIQUE
);

-- Figure out how to make the unique property case insensitive when back on wifi.
CREATE TABLE IF NOT EXISTS topic ( 
    id SERIAL PRIMARY KEY,
    value VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS mdx_note (
    id SERIAL PRIMARY KEY,
-- Not varchar to allow for an indefinite length.
    file_path TEXT,
-- The notes raw mdx content with the front matter removed.
    raw_body TEXT NOT NULL,
-- The time the file was created.
    ctime TIMESTAMP,
-- The time the file was last modified.
    mtime TIMESTAMP,
-- The time of last access. This might be unreliable if the file is being accessed as part of the sync script.
    atime TIMESTAMP,
-- Updated each time the note is syncrhonized. This can be useful for more optimized syncing in the future.
    last_sync TIMESTAMP NOT NULL
);


CREATE TABLE IF NOT EXISTS mdx_note_tag_join (
    mdx_note_id INT NOT NULL,
    tag_id INT NOT NULL,
    CONSTRAINT fk_mdx_note_id
        FOREIGN KEY(mdx_note_id)
            REFERENCES mdx_note(id),
    CONSTRAINT fk_tag_id
        FOREIGN KEY(tag_id)
           REFERENCES tag(id),
    PRIMARY KEY (mdx_note_id, tag_id)
);


CREATE TABLE IF NOT EXISTS snippet (
    id SERIAL PRIMARY KEY,
    label TEXT NOT NULL,
    description TEXT NOT NULL,
    lang VARCHAR(20) NOT NULL DEFAULT 'python',
    body TEXT NOT NULL
);


CREATE TABLE IF NOT EXISTS equation ( 
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    label TEXT NOT NULL,
    description TEXT NOT NULL,
    eq_id VARCHAR(100)
);


CREATE TABLE IF NOT EXISTS equation_mdx_note_join (
    mdx_note_id INT NOT NULL,
    equation_id INT NOT NULL,
    CONSTRAINT fk_mdx_note_id
        FOREIGN KEY(mdx_note_id)
            REFERENCES mdx_note(id),
    CONSTRAINT fk_equation_id
        FOREIGN KEY(equation_id)
           REFERENCES equation(id),
    PRIMARY KEY (mdx_note_id, equation_id)
);


CREATE TABLE IF NOT EXISTS equation_snippet_join (
    equation_id INT NOT NULL,
    snippet_id INT NOT NULL,
    CONSTRAINT fk_snippet_id
        FOREIGN KEY(snippet_id)
            REFERENCES snippet(id),
    CONSTRAINT fk_equation_id
        FOREIGN KEY(equation_id)
           REFERENCES equation(id),
    PRIMARY KEY (equation_id, snippet_id)
);

CREATE TABLE IF NOT EXISTS tag_snippet_join (
    tag_id INT NOT NULL,
    snippet_id INT NOT NULL,
    CONSTRAINT fk_snippet_id
        FOREIGN KEY(snippet_id)
            REFERENCES snippet(id),
    CONSTRAINT fk_tag_id
        FOREIGN KEY(tag_id)
           REFERENCES tag(id),
    PRIMARY KEY (tag_id, snippet_id)
);


CREATE TABLE IF NOT EXISTS front_matter ( 
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    summary TEXT,
    mdx_note_id INT NOT NULL REFERENCES mdx_note(id),
-- This is the id field in the user's front matter.
    user_provided_id VARCHAR(50)
);


CREATE TABLE IF NOT EXISTS front_matter_tag_join (
    tag_id INT NOT NULL,
    front_matter_id INT NOT NULL,
    CONSTRAINT fk_tag_id 
        FOREIGN KEY(tag_id)
            REFERENCES tag(id),
    CONSTRAINT fk_front_matter_id
        FOREIGN KEY(front_matter_id)
           REFERENCES front_matter(id),
    PRIMARY KEY (tag_id, front_matter_id)
);

--
-- Bibliography 
--

CREATE TABLE IF NOT EXISTS reading_list ( 
    id SERIAL PRIMARY KEY,
    "desc" TEXT NOT NULL,
    label VARCHAR(30) NOT NULL,
    ctime TIMESTAMP NOT NULL DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS bib_entry (
    id SERIAL PRIMARY KEY,
-- The notes raw mdx content with the front matter removed.
    data JSON NOT NULL,
    pdf_path TEXT,
    read BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS reading_list_bib_entry_join (
    bib_entry_id INT NOT NULL,
    reading_list_id INT NOT NULL,
    CONSTRAINT fk_reading_list 
        FOREIGN KEY(reading_list_id)
            REFERENCES reading_list(id),
    CONSTRAINT fk_bib_entry 
        FOREIGN KEY(bib_entry_id)
           REFERENCES bib_entry(id),
    PRIMARY KEY (bib_entry_id, reading_list_id)
);
