-- This file was automatically created by Diesel to setup helper functions
-- and other internal bookkeeping. This file is safe to edit, any future
-- changes will be added to existing projects as new migrations.




-- Sets up a trigger for the given table to automatically set a column called
-- `updated_at` whenever the row is modified (unless `updated_at` was included
-- in the modified columns)
--
-- # Example
--
-- ```sql
-- CREATE TABLE users (id SERIAL PRIMARY KEY, updated_at TIMESTAMP NOT NULL DEFAULT NOW());
--
-- SELECT diesel_manage_updated_at('users');
-- ```
CREATE OR REPLACE FUNCTION diesel_manage_updated_at(_tbl regclass) RETURNS VOID AS $$
BEGIN
    EXECUTE format('CREATE TRIGGER set_updated_at BEFORE UPDATE ON %s
                    FOR EACH ROW EXECUTE PROCEDURE diesel_set_updated_at()', _tbl);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION diesel_set_updated_at() RETURNS trigger AS $$
BEGIN
    IF (
        NEW IS DISTINCT FROM OLD AND
        NEW.updated_at IS NOT DISTINCT FROM OLD.updated_at
    ) THEN
        NEW.updated_at := current_timestamp;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;



CREATE TABLE mdx_note (
    id SERIAL PRIMARY KEY,
-- Not varchar to allow for an indefinite length.
    file_path TEXT,
-- The notes raw mdx content with the front matter removed.
    raw_body TEXT,
-- The time the file was created.
    ctime TIMESTAMP,
-- The time the file was last modified.
    mtime TIMESTAMP,
-- The time of last access. This might be unreliable if the file is being accessed as part of the sync script.
    atime TIMESTAMP 
);



--
-- Bibliography 
--

CREATE TABLE reading_list ( 
    id SERIAL PRIMARY KEY
);

-- CREATE TABLE reading_list_bib_entry_join 
-- (
--     id SERIAL PRIMARY KEY,
--     bib_entry_id INT,
--     CONSTRAINT fk_bib_entry 
--         FOREIGN KEY(bib_entry_id)
--            REFERENCES bib_entry(id)
--     reading_list_id INT,
--     CONSTRAINT fk_reading_list 
--         FOREIGN KEY(reading_list_id)
--            REFERENCES reading_list(id)
-- );

-- CREATE TABLE bib_entry 
-- (
--     id SERIAL PRIMARY KEY,
-- -- The notes raw mdx content with the front matter removed.
--     data JSON,
-- );
