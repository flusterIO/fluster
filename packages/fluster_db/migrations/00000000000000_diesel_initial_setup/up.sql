-- This file was automatically created by Diesel to setup helper functions
-- and other internal bookkeeping. This file is safe to edit, any future
-- changes will be added to existing projects as new migrations.




-- Sets up a trigger for the given table to automatically set a column called
-- `updated_at` whenever the row is modified (unless `updated_at` was included
-- in the modified columns)
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

CREATE TYPE supported_language
AS ENUM (
    'abap',
    'actionscript',
    'ada',
    'angular',
    'apache',
    'apex'
    'apl',
    'applescript',
    'ara',
    'asciidoc',
    'asm',
    'astro',
    'awk',
    'ballerina',
    'bat',
    'beancount',
    'berry',
    'bibtex',
    'bicep',
    'blade',
    'bsl',
    'c',
    'cadence',
    'cairo',
    'clarity',
    'clojure',
    'cmake',
    'cobol',
    'codeowners',
    'codeql',
    'coffee',
    'common',
    'coq',
    'cpp',
    'crystal',
    'csharp',
    'css',
    'csv',
    'cue',
    'cypher',
    'd',
    'dart',
    'dax',
    'desktop',
    'diff',
    'docker',
    'dotenv',
    'dream',
    'edge',
    'elixir',
    'elm',
    'emacs',
    'erb',
    'erlang',
    'fennel',
    'fish',
    'fluent',
    'fortran',
    'fsharp',
    'gdresource',
    'gdscript',
    'gdshader',
    'genie',
    'gherkin',
    'git',
    'gleam',
    'glimmer',
    'glsl',
    'gnuplot',
    'go',
    'graphql',
    'groovy',
    'hack',
    'haml',
    'handlebars',
    'haskell',
    'haxe',
    'hcl',
    'hjson',
    'hlsl',
    'html',
    'http',
    'hxml',
    'hy',
    'imba',
    'ini',
    'java',
    'javascript',
    'jinja',
    'jison',
    'json',
    'json5',
    'jsonc',
    'jsonl',
    'jsonnet',
    'jssm',
    'jsx',
    'julia',
    'kotlin',
    'kusto',
    'latex',
    'lean',
    'less',
    'liquid',
    'llvm',
    'log',
    'logo',
    'lua',
    'luau',
    'make',
    'markdown',
    'marko',
    'matlab',
    'mdc',
    'mdx',
    'mermaid',
    'mipsasm',
    'mojo',
    'move',
    'narrat',
    'nextflow',
    'nginx',
    'nim',
    'nix',
    'nushell',
    'objective',
    'ocaml',
    'pascal',
    'perl',
    'php',
    'plsql',
    'po',
    'polar',
    'postcss',
    'powerquery',
    'powershell',
    'prisma',
    'prolog',
    'proto',
    'pug',
    'puppet',
    'purescript',
    'python',
    'qml',
    'qmldir',
    'qss',
    'r',
    'racket',
    'raku',
    'razor',
    'reg',
    'regexp',
    'rel',
    'riscv',
    'rst',
    'ruby',
    'rust',
    'sas',
    'sass',
    'scala',
    'scheme',
    'scss',
    'sdbl',
    'shaderlab',
    'shellscript',
    'shellsession',
    'smalltalk',
    'solidity',
    'soy',
    'sparql',
    'splunk',
    'sql',
    'ssh',
    'stata',
    'stylus',
    'svelte',
    'swift',
    'system',
    'systemd',
    'talonscript',
    'tasl',
    'tcl',
    'templ',
    'terraform',
    'tex',
    'toml',
    'ts',
    'tsv',
    'tsx',
    'turtle',
    'twig',
    'typescript',
    'typespec',
    'typst',
    'v',
    'vala',
    'vb',
    'verilog',
    'vhdl',
    'viml',
    'vue',
    'vyper',
    'wasm',
    'wenyan',
    'wgsl',

    'wikitext',
    'wit',
    'wolfram',
    'xml',
    'xsl',
    'yaml',
    'zenscript',
    'zig',
    'adoc',
    'batch',
    'be',
    'cdc',
    'clj',
    'ql',
    'coffeescript',
    'lisp',
    'c++',
    'c#',
    'cs',
    'cql',
    'dockerfile',
    'elisp',
    'erl',
    'ftl',
    'f',
    'for',
    'f77',
    'f90',
    'f95',
    'f03',
    'f08',
    'f18',
    'f#',
    'fs',
    'gjs',
    'gts',
    'gql',
    'hbs',
    'hs',
    'properties',
    'js',
    'fsl',
    'jl',
    'kt',
    'kts',
    'kql',
    'lean4',
    'makefile',
    'md',
    'mmd',
    'mips',
    'nar',
    'nf',
    'nu',
    'objc',
    'pot',
    'potx',
    'ps',
    'ps1',
    'protobuf',
    'jade',
    'py',
    'perl6',
    'regex',
    'rb',
    'rs',
    '1c',
    'shader',
    'bash',
    'sh',
    'shell',
    'zsh',
    'console',
    'closure',
    'spl',
    'styl',
    'talon',
    'tf',
    'tfvars',
    'lit',
    'tsp',
    'typ',
    'cmd',
    'vim',
    'vimscript',
    'vy',
    'mediawiki',
    'wiki',
    'wl',
    'yml'
);


CREATE TABLE log (
    id SERIAL PRIMARY KEY,
    "msg" VARCHAR(255) NOT NULL, 
    ctime TIMESTAMP NOT NULL DEFAULT NOW()
);


-- This needs to be handled as part of the log or init function. The init function will likely be more performant as it will only run once when the app starts. 
-- DELETE FROM log 
-- WHERE ctime < NOW() - INTERVAL '7 days'


CREATE TABLE tag ( 
    value VARCHAR(40) PRIMARY KEY
);



CREATE TABLE subject ( 
    value VARCHAR(40) PRIMARY KEY
);


CREATE TABLE topic ( 
    value VARCHAR(40) PRIMARY KEY
);


CREATE TABLE mdx_note (
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


CREATE TABLE snippet (
    id SERIAL PRIMARY KEY,
    label TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    lang SUPPORTED_LANGUAGE NOT NULL DEFAULT 'python',
    body TEXT NOT NULL
);

CREATE TABLE equation ( 
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    label TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    eq_id VARCHAR(100)
);


CREATE TABLE equation_snippet_join (
    id SERIAL PRIMARY KEY,
    equation_id INT NOT NULL,
    snippet_id INT NOT NULL,
    CONSTRAINT fk_snippet_id
        FOREIGN KEY(snippet_id)
            REFERENCES snippet(id),
    CONSTRAINT fk_equation_id
        FOREIGN KEY(equation_id)
           REFERENCES equation(id)
);


CREATE TABLE front_matter ( 
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    summary TEXT,
    mdx_note_id INT NOT NULL REFERENCES mdx_note(id),
-- This is the id field in the user's front matter.
    user_provided_id VARCHAR(50)
);


CREATE TABLE front_matter_tag_join (
    id SERIAL PRIMARY KEY,
    tag_id INT NOT NULL,
    front_matter_id INT NOT NULL,
    CONSTRAINT fk_tag_id 
        FOREIGN KEY(tag_id)
            REFERENCES tag(id),
    CONSTRAINT fk_front_matter_id
        FOREIGN KEY(front_matter_id)
           REFERENCES front_matter(id)
);

--
-- Bibliography 
--

CREATE TABLE reading_list ( 
    id SERIAL PRIMARY KEY,
    "desc" TEXT NOT NULL,
    label VARCHAR(30) NOT NULL,
    ctime TIMESTAMP NOT NULL DEFAULT NOW()
);


CREATE TABLE bib_entry (
    id SERIAL PRIMARY KEY,
-- The notes raw mdx content with the front matter removed.
    data JSON NOT NULL,
    pdf_path TEXT,
    read BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE reading_list_bib_entry_join (
    id SERIAL PRIMARY KEY,
    bib_entry_id INT NOT NULL,
    reading_list_id INT NOT NULL,
    CONSTRAINT fk_reading_list 
        FOREIGN KEY(reading_list_id)
            REFERENCES reading_list(id),
    CONSTRAINT fk_bib_entry 
        FOREIGN KEY(bib_entry_id)
           REFERENCES bib_entry(id)
);


