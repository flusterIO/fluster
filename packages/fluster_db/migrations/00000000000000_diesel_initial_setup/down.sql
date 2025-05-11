-- This file was automatically created by Diesel to setup helper functions
-- and other internal bookkeeping. This file is safe to edit, any future
-- changes will be added to existing projects as new migrations.

DROP FUNCTION IF EXISTS diesel_manage_updated_at(_tbl regclass);
DROP FUNCTION IF EXISTS diesel_set_updated_at();

DROP TABLE IF EXISTS mdx_note;
DROP TABLE IF EXISTS setting;
DROP TABLE IF EXISTS reading_list;
DROP TABLE IF EXISTS bib_entry;
DROP TABLE IF EXISTS reading_list_bib_entry_join;
