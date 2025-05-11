use serde::{Deserialize, Serialize};

/** Languages generated from shiki. */
#[derive(Debug, Serialize, Deserialize, Clone, Default)]
pub enum SupportedSyntaxLanguage {
    #[serde(rename(serialize = "abap", deserialize = "abap"))]
    Abap,
    #[serde(rename(serialize = "actionscript-3", deserialize = "actionscript-3"))]
    Actionscript3,
    #[serde(rename(serialize = "ada", deserialize = "ada"))]
    Ada,
    #[serde(rename(serialize = "angular-html", deserialize = "angular-html"))]
    AngularHtml,
    #[serde(rename(serialize = "angular-ts", deserialize = "angular-ts"))]
    AngularTs,
    #[serde(rename(serialize = "apache", deserialize = "apache"))]
    Apache,
    #[serde(rename(serialize = "apex", deserialize = "apex"))]
    Apex,
    #[serde(rename(serialize = "apl", deserialize = "apl"))]
    Apl,
    #[serde(rename(serialize = "applescript", deserialize = "applescript"))]
    Applescript,
    #[serde(rename(serialize = "ara", deserialize = "ara"))]
    Ara,
    #[serde(rename(serialize = "asciidoc", deserialize = "asciidoc"))]
    Asciidoc,
    #[serde(rename(serialize = "asm", deserialize = "asm"))]
    Asm,
    #[serde(rename(serialize = "astro", deserialize = "astro"))]
    Astro,
    #[serde(rename(serialize = "awk", deserialize = "awk"))]
    Awk,
    #[serde(rename(serialize = "ballerina", deserialize = "ballerina"))]
    Ballerina,
    #[serde(rename(serialize = "bat", deserialize = "bat"))]
    Bat,
    #[serde(rename(serialize = "beancount", deserialize = "beancount"))]
    Beancount,
    #[serde(rename(serialize = "berry", deserialize = "berry"))]
    Berry,
    #[serde(rename(serialize = "bibtex", deserialize = "bibtex"))]
    Bibtex,
    #[serde(rename(serialize = "bicep", deserialize = "bicep"))]
    Bicep,
    #[serde(rename(serialize = "blade", deserialize = "blade"))]
    Blade,
    #[serde(rename(serialize = "bsl", deserialize = "bsl"))]
    Bsl,
    #[serde(rename(serialize = "c", deserialize = "c"))]
    C,
    #[serde(rename(serialize = "cadence", deserialize = "cadence"))]
    Cadence,
    #[serde(rename(serialize = "cairo", deserialize = "cairo"))]
    Cairo,
    #[serde(rename(serialize = "clarity", deserialize = "clarity"))]
    Clarity,
    #[serde(rename(serialize = "clojure", deserialize = "clojure"))]
    Clojure,
    #[serde(rename(serialize = "cmake", deserialize = "cmake"))]
    Cmake,
    #[serde(rename(serialize = "cobol", deserialize = "cobol"))]
    Cobol,
    #[serde(rename(serialize = "codeowners", deserialize = "codeowners"))]
    Codeowners,
    #[serde(rename(serialize = "codeql", deserialize = "codeql"))]
    Codeql,
    #[serde(rename(serialize = "coffee", deserialize = "coffee"))]
    Coffee,
    #[serde(rename(serialize = "common-lisp", deserialize = "common-lisp"))]
    CommonLisp,
    #[serde(rename(serialize = "coq", deserialize = "coq"))]
    Coq,
    #[serde(rename(serialize = "cpp", deserialize = "cpp"))]
    Cpp,
    #[serde(rename(serialize = "crystal", deserialize = "crystal"))]
    Crystal,
    #[serde(rename(serialize = "csharp", deserialize = "csharp"))]
    Csharp,
    #[serde(rename(serialize = "css", deserialize = "css"))]
    Css,
    #[serde(rename(serialize = "csv", deserialize = "csv"))]
    Csv,
    #[serde(rename(serialize = "cue", deserialize = "cue"))]
    Cue,
    #[serde(rename(serialize = "cypher", deserialize = "cypher"))]
    Cypher,
    #[serde(rename(serialize = "d", deserialize = "d"))]
    D,
    #[serde(rename(serialize = "dart", deserialize = "dart"))]
    Dart,
    #[serde(rename(serialize = "dax", deserialize = "dax"))]
    Dax,
    #[serde(rename(serialize = "desktop", deserialize = "desktop"))]
    Desktop,
    #[serde(rename(serialize = "diff", deserialize = "diff"))]
    Diff,
    #[serde(rename(serialize = "docker", deserialize = "docker"))]
    Docker,
    #[serde(rename(serialize = "dotenv", deserialize = "dotenv"))]
    Dotenv,
    #[serde(rename(serialize = "dream-maker", deserialize = "dream-maker"))]
    DreamMaker,
    #[serde(rename(serialize = "edge", deserialize = "edge"))]
    Edge,
    #[serde(rename(serialize = "elixir", deserialize = "elixir"))]
    Elixir,
    #[serde(rename(serialize = "elm", deserialize = "elm"))]
    Elm,
    #[serde(rename(serialize = "emacs-lisp", deserialize = "emacs-lisp"))]
    EmacsLisp,
    #[serde(rename(serialize = "erb", deserialize = "erb"))]
    Erb,
    #[serde(rename(serialize = "erlang", deserialize = "erlang"))]
    Erlang,
    #[serde(rename(serialize = "fennel", deserialize = "fennel"))]
    Fennel,
    #[serde(rename(serialize = "fish", deserialize = "fish"))]
    Fish,
    #[serde(rename(serialize = "fluent", deserialize = "fluent"))]
    Fluent,
    #[serde(rename(serialize = "fortran-fixed-form", deserialize = "fortran-fixed-form"))]
    FortranFixedForm,
    #[serde(rename(serialize = "fortran-free-form", deserialize = "fortran-free-form"))]
    FortranFreeForm,
    #[serde(rename(serialize = "fsharp", deserialize = "fsharp"))]
    Fsharp,
    #[serde(rename(serialize = "gdresource", deserialize = "gdresource"))]
    Gdresource,
    #[serde(rename(serialize = "gdscript", deserialize = "gdscript"))]
    Gdscript,
    #[serde(rename(serialize = "gdshader", deserialize = "gdshader"))]
    Gdshader,
    #[serde(rename(serialize = "genie", deserialize = "genie"))]
    Genie,
    #[serde(rename(serialize = "gherkin", deserialize = "gherkin"))]
    Gherkin,
    #[serde(rename(serialize = "git-commit", deserialize = "git-commit"))]
    GitCommit,
    #[serde(rename(serialize = "git-rebase", deserialize = "git-rebase"))]
    GitRebase,
    #[serde(rename(serialize = "gleam", deserialize = "gleam"))]
    Gleam,
    #[serde(rename(serialize = "glimmer-js", deserialize = "glimmer-js"))]
    GlimmerJs,
    #[serde(rename(serialize = "glimmer-ts", deserialize = "glimmer-ts"))]
    GlimmerTs,
    #[serde(rename(serialize = "glsl", deserialize = "glsl"))]
    Glsl,
    #[serde(rename(serialize = "gnuplot", deserialize = "gnuplot"))]
    Gnuplot,
    #[serde(rename(serialize = "go", deserialize = "go"))]
    Go,
    #[serde(rename(serialize = "graphql", deserialize = "graphql"))]
    Graphql,
    #[serde(rename(serialize = "groovy", deserialize = "groovy"))]
    Groovy,
    #[serde(rename(serialize = "hack", deserialize = "hack"))]
    Hack,
    #[serde(rename(serialize = "haml", deserialize = "haml"))]
    Haml,
    #[serde(rename(serialize = "handlebars", deserialize = "handlebars"))]
    Handlebars,
    #[serde(rename(serialize = "haskell", deserialize = "haskell"))]
    Haskell,
    #[serde(rename(serialize = "haxe", deserialize = "haxe"))]
    Haxe,
    #[serde(rename(serialize = "hcl", deserialize = "hcl"))]
    Hcl,
    #[serde(rename(serialize = "hjson", deserialize = "hjson"))]
    Hjson,
    #[serde(rename(serialize = "hlsl", deserialize = "hlsl"))]
    Hlsl,
    #[serde(rename(serialize = "html", deserialize = "html"))]
    Html,
    #[serde(rename(serialize = "html-derivative", deserialize = "html-derivative"))]
    HtmlDerivative,
    #[serde(rename(serialize = "http", deserialize = "http"))]
    Http,
    #[serde(rename(serialize = "hxml", deserialize = "hxml"))]
    Hxml,
    #[serde(rename(serialize = "hy", deserialize = "hy"))]
    Hy,
    #[serde(rename(serialize = "imba", deserialize = "imba"))]
    Imba,
    #[serde(rename(serialize = "ini", deserialize = "ini"))]
    Ini,
    #[serde(rename(serialize = "java", deserialize = "java"))]
    Java,
    #[serde(rename(serialize = "javascript", deserialize = "javascript"))]
    Javascript,
    #[serde(rename(serialize = "jinja", deserialize = "jinja"))]
    Jinja,
    #[serde(rename(serialize = "jison", deserialize = "jison"))]
    Jison,
    #[serde(rename(serialize = "json", deserialize = "json"))]
    Json,
    #[serde(rename(serialize = "json5", deserialize = "json5"))]
    Json5,
    #[serde(rename(serialize = "jsonc", deserialize = "jsonc"))]
    Jsonc,
    #[serde(rename(serialize = "jsonl", deserialize = "jsonl"))]
    Jsonl,
    #[serde(rename(serialize = "jsonnet", deserialize = "jsonnet"))]
    Jsonnet,
    #[serde(rename(serialize = "jssm", deserialize = "jssm"))]
    Jssm,
    #[serde(rename(serialize = "jsx", deserialize = "jsx"))]
    Jsx,
    #[serde(rename(serialize = "julia", deserialize = "julia"))]
    Julia,
    #[serde(rename(serialize = "kotlin", deserialize = "kotlin"))]
    Kotlin,
    #[serde(rename(serialize = "kusto", deserialize = "kusto"))]
    Kusto,
    #[serde(rename(serialize = "latex", deserialize = "latex"))]
    Latex,
    #[serde(rename(serialize = "lean", deserialize = "lean"))]
    Lean,
    #[serde(rename(serialize = "less", deserialize = "less"))]
    Less,
    #[serde(rename(serialize = "liquid", deserialize = "liquid"))]
    Liquid,
    #[serde(rename(serialize = "llvm", deserialize = "llvm"))]
    Llvm,
    #[serde(rename(serialize = "log", deserialize = "log"))]
    Log,
    #[serde(rename(serialize = "logo", deserialize = "logo"))]
    Logo,
    #[serde(rename(serialize = "lua", deserialize = "lua"))]
    Lua,
    #[serde(rename(serialize = "luau", deserialize = "luau"))]
    Luau,
    #[serde(rename(serialize = "make", deserialize = "make"))]
    Make,
    #[serde(rename(serialize = "markdown", deserialize = "markdown"))]
    Markdown,
    #[serde(rename(serialize = "marko", deserialize = "marko"))]
    Marko,
    #[serde(rename(serialize = "matlab", deserialize = "matlab"))]
    Matlab,
    #[serde(rename(serialize = "mdc", deserialize = "mdc"))]
    Mdc,
    #[serde(rename(serialize = "mdx", deserialize = "mdx"))]
    Mdx,
    #[serde(rename(serialize = "mermaid", deserialize = "mermaid"))]
    Mermaid,
    #[serde(rename(serialize = "mipsasm", deserialize = "mipsasm"))]
    Mipsasm,
    #[serde(rename(serialize = "mojo", deserialize = "mojo"))]
    Mojo,
    #[serde(rename(serialize = "move", deserialize = "move"))]
    Move,
    #[serde(rename(serialize = "narrat", deserialize = "narrat"))]
    Narrat,
    #[serde(rename(serialize = "nextflow", deserialize = "nextflow"))]
    Nextflow,
    #[serde(rename(serialize = "nginx", deserialize = "nginx"))]
    Nginx,
    #[serde(rename(serialize = "nim", deserialize = "nim"))]
    Nim,
    #[serde(rename(serialize = "nix", deserialize = "nix"))]
    Nix,
    #[serde(rename(serialize = "nushell", deserialize = "nushell"))]
    Nushell,
    #[serde(rename(serialize = "objective-c", deserialize = "objective-c"))]
    ObjectiveC,
    #[serde(rename(serialize = "objective-cpp", deserialize = "objective-cpp"))]
    ObjectiveCpp,
    #[serde(rename(serialize = "ocaml", deserialize = "ocaml"))]
    Ocaml,
    #[serde(rename(serialize = "pascal", deserialize = "pascal"))]
    Pascal,
    #[serde(rename(serialize = "perl", deserialize = "perl"))]
    Perl,
    #[serde(rename(serialize = "php", deserialize = "php"))]
    Php,
    #[serde(rename(serialize = "plsql", deserialize = "plsql"))]
    Plsql,
    #[serde(rename(serialize = "po", deserialize = "po"))]
    Po,
    #[serde(rename(serialize = "polar", deserialize = "polar"))]
    Polar,
    #[serde(rename(serialize = "postcss", deserialize = "postcss"))]
    Postcss,
    #[serde(rename(serialize = "powerquery", deserialize = "powerquery"))]
    Powerquery,
    #[serde(rename(serialize = "powershell", deserialize = "powershell"))]
    Powershell,
    #[serde(rename(serialize = "prisma", deserialize = "prisma"))]
    Prisma,
    #[serde(rename(serialize = "prolog", deserialize = "prolog"))]
    Prolog,
    #[serde(rename(serialize = "proto", deserialize = "proto"))]
    Proto,
    #[serde(rename(serialize = "pug", deserialize = "pug"))]
    Pug,
    #[serde(rename(serialize = "puppet", deserialize = "puppet"))]
    Puppet,
    #[serde(rename(serialize = "purescript", deserialize = "purescript"))]
    Purescript,
    #[serde(rename(serialize = "python", deserialize = "python"))]
    #[default]
    Python,
    #[serde(rename(serialize = "qml", deserialize = "qml"))]
    Qml,
    #[serde(rename(serialize = "qmldir", deserialize = "qmldir"))]
    Qmldir,
    #[serde(rename(serialize = "qss", deserialize = "qss"))]
    Qss,
    #[serde(rename(serialize = "r", deserialize = "r"))]
    R,
    #[serde(rename(serialize = "racket", deserialize = "racket"))]
    Racket,
    #[serde(rename(serialize = "raku", deserialize = "raku"))]
    Raku,
    #[serde(rename(serialize = "razor", deserialize = "razor"))]
    Razor,
    #[serde(rename(serialize = "reg", deserialize = "reg"))]
    Reg,
    #[serde(rename(serialize = "regexp", deserialize = "regexp"))]
    Regexp,
    #[serde(rename(serialize = "rel", deserialize = "rel"))]
    Rel,
    #[serde(rename(serialize = "riscv", deserialize = "riscv"))]
    Riscv,
    #[serde(rename(serialize = "rst", deserialize = "rst"))]
    Rst,
    #[serde(rename(serialize = "ruby", deserialize = "ruby"))]
    Ruby,
    #[serde(rename(serialize = "rust", deserialize = "rust"))]
    Rust,
    #[serde(rename(serialize = "sas", deserialize = "sas"))]
    Sas,
    #[serde(rename(serialize = "sass", deserialize = "sass"))]
    Sass,
    #[serde(rename(serialize = "scala", deserialize = "scala"))]
    Scala,
    #[serde(rename(serialize = "scheme", deserialize = "scheme"))]
    Scheme,
    #[serde(rename(serialize = "scss", deserialize = "scss"))]
    Scss,
    #[serde(rename(serialize = "sdbl", deserialize = "sdbl"))]
    Sdbl,
    #[serde(rename(serialize = "shaderlab", deserialize = "shaderlab"))]
    Shaderlab,
    #[serde(rename(serialize = "shellscript", deserialize = "shellscript"))]
    Shellscript,
    #[serde(rename(serialize = "shellsession", deserialize = "shellsession"))]
    Shellsession,
    #[serde(rename(serialize = "smalltalk", deserialize = "smalltalk"))]
    Smalltalk,
    #[serde(rename(serialize = "solidity", deserialize = "solidity"))]
    Solidity,
    #[serde(rename(serialize = "soy", deserialize = "soy"))]
    Soy,
    #[serde(rename(serialize = "sparql", deserialize = "sparql"))]
    Sparql,
    #[serde(rename(serialize = "splunk", deserialize = "splunk"))]
    Splunk,
    #[serde(rename(serialize = "sql", deserialize = "sql"))]
    Sql,
    #[serde(rename(serialize = "ssh-config", deserialize = "ssh-config"))]
    SshConfig,
    #[serde(rename(serialize = "stata", deserialize = "stata"))]
    Stata,
    #[serde(rename(serialize = "stylus", deserialize = "stylus"))]
    Stylus,
    #[serde(rename(serialize = "svelte", deserialize = "svelte"))]
    Svelte,
    #[serde(rename(serialize = "swift", deserialize = "swift"))]
    Swift,
    #[serde(rename(serialize = "system-verilog", deserialize = "system-verilog"))]
    SystemVerilog,
    #[serde(rename(serialize = "systemd", deserialize = "systemd"))]
    Systemd,
    #[serde(rename(serialize = "talonscript", deserialize = "talonscript"))]
    Talonscript,
    #[serde(rename(serialize = "tasl", deserialize = "tasl"))]
    Tasl,
    #[serde(rename(serialize = "tcl", deserialize = "tcl"))]
    Tcl,
    #[serde(rename(serialize = "templ", deserialize = "templ"))]
    Templ,
    #[serde(rename(serialize = "terraform", deserialize = "terraform"))]
    Terraform,
    #[serde(rename(serialize = "tex", deserialize = "tex"))]
    Tex,
    #[serde(rename(serialize = "toml", deserialize = "toml"))]
    Toml,
    #[serde(rename(serialize = "ts-tags", deserialize = "ts-tags"))]
    TsTags,
    #[serde(rename(serialize = "tsv", deserialize = "tsv"))]
    Tsv,
    #[serde(rename(serialize = "tsx", deserialize = "tsx"))]
    Tsx,
    #[serde(rename(serialize = "turtle", deserialize = "turtle"))]
    Turtle,
    #[serde(rename(serialize = "twig", deserialize = "twig"))]
    Twig,
    #[serde(rename(serialize = "typescript", deserialize = "typescript"))]
    Typescript,
    #[serde(rename(serialize = "typespec", deserialize = "typespec"))]
    Typespec,
    #[serde(rename(serialize = "typst", deserialize = "typst"))]
    Typst,
    #[serde(rename(serialize = "v", deserialize = "v"))]
    V,
    #[serde(rename(serialize = "vala", deserialize = "vala"))]
    Vala,
    #[serde(rename(serialize = "vb", deserialize = "vb"))]
    Vb,
    #[serde(rename(serialize = "verilog", deserialize = "verilog"))]
    Verilog,
    #[serde(rename(serialize = "vhdl", deserialize = "vhdl"))]
    Vhdl,
    #[serde(rename(serialize = "viml", deserialize = "viml"))]
    Viml,
    #[serde(rename(serialize = "vue", deserialize = "vue"))]
    Vue,
    #[serde(rename(serialize = "vue-html", deserialize = "vue-html"))]
    VueHtml,
    #[serde(rename(serialize = "vyper", deserialize = "vyper"))]
    Vyper,
    #[serde(rename(serialize = "wasm", deserialize = "wasm"))]
    Wasm,
    #[serde(rename(serialize = "wenyan", deserialize = "wenyan"))]
    Wenyan,
    #[serde(rename(serialize = "wgsl", deserialize = "wgsl"))]
    Wgsl,
    #[serde(rename(serialize = "wikitext", deserialize = "wikitext"))]
    Wikitext,
    #[serde(rename(serialize = "wit", deserialize = "wit"))]
    Wit,
    #[serde(rename(serialize = "wolfram", deserialize = "wolfram"))]
    Wolfram,
    #[serde(rename(serialize = "xml", deserialize = "xml"))]
    Xml,
    #[serde(rename(serialize = "xsl", deserialize = "xsl"))]
    Xsl,
    #[serde(rename(serialize = "yaml", deserialize = "yaml"))]
    Yaml,
    #[serde(rename(serialize = "zenscript", deserialize = "zenscript"))]
    Zenscript,
    #[serde(rename(serialize = "zig", deserialize = "zig"))]
    Zig,
    #[serde(rename(serialize = "adoc", deserialize = "adoc"))]
    Adoc,
    #[serde(rename(serialize = "batch", deserialize = "batch"))]
    Batch,
    #[serde(rename(serialize = "be", deserialize = "be"))]
    Be,
    #[serde(rename(serialize = "1c", deserialize = "1c"))]
    OneC,
    #[serde(rename(serialize = "cdc", deserialize = "cdc"))]
    Cdc,
    #[serde(rename(serialize = "clj", deserialize = "clj"))]
    Clj,
    #[serde(rename(serialize = "ql", deserialize = "ql"))]
    Ql,
    #[serde(rename(serialize = "coffeescript", deserialize = "coffeescript"))]
    Coffeescript,
    #[serde(rename(serialize = "lisp", deserialize = "lisp"))]
    Lisp,
    #[serde(rename(serialize = "c++", deserialize = "c++"))]
    CPlusPlus,
    #[serde(rename(serialize = "c#", deserialize = "c#"))]
    CSharp,
    #[serde(rename(serialize = "cs", deserialize = "cs"))]
    Cs,
    #[serde(rename(serialize = "cql", deserialize = "cql"))]
    Cql,
    #[serde(rename(serialize = "dockerfile", deserialize = "dockerfile"))]
    Dockerfile,
    #[serde(rename(serialize = "elisp", deserialize = "elisp"))]
    Elisp,
    #[serde(rename(serialize = "erl", deserialize = "erl"))]
    Erl,
    #[serde(rename(serialize = "ftl", deserialize = "ftl"))]
    Ftl,
    #[serde(rename(serialize = "f", deserialize = "f"))]
    F,
    #[serde(rename(serialize = "for", deserialize = "for"))]
    For,
    #[serde(rename(serialize = "f77", deserialize = "f77"))]
    F77,
    #[serde(rename(serialize = "f90", deserialize = "f90"))]
    F90,
    #[serde(rename(serialize = "f95", deserialize = "f95"))]
    F95,
    #[serde(rename(serialize = "f03", deserialize = "f03"))]
    F03,
    #[serde(rename(serialize = "f08", deserialize = "f08"))]
    F08,
    #[serde(rename(serialize = "f18", deserialize = "f18"))]
    F18,
    #[serde(rename(serialize = "f#", deserialize = "f#"))]
    FSharp,
    #[serde(rename(serialize = "fs", deserialize = "fs"))]
    Fs,
    #[serde(rename(serialize = "gjs", deserialize = "gjs"))]
    Gjs,
    #[serde(rename(serialize = "gts", deserialize = "gts"))]
    Gts,
    #[serde(rename(serialize = "gql", deserialize = "gql"))]
    Gql,
    #[serde(rename(serialize = "hbs", deserialize = "hbs"))]
    Hbs,
    #[serde(rename(serialize = "hs", deserialize = "hs"))]
    Hs,
    #[serde(rename(serialize = "properties", deserialize = "properties"))]
    Properties,
    #[serde(rename(serialize = "js", deserialize = "js"))]
    Js,
    #[serde(rename(serialize = "fsl", deserialize = "fsl"))]
    Fsl,
    #[serde(rename(serialize = "jl", deserialize = "jl"))]
    Jl,
    #[serde(rename(serialize = "kt", deserialize = "kt"))]
    Kt,
    #[serde(rename(serialize = "kts", deserialize = "kts"))]
    Kts,
    #[serde(rename(serialize = "kql", deserialize = "kql"))]
    Kql,
    #[serde(rename(serialize = "lean4", deserialize = "lean4"))]
    Lean4,
    #[serde(rename(serialize = "makefile", deserialize = "makefile"))]
    Makefile,
    #[serde(rename(serialize = "md", deserialize = "md"))]
    Md,
    #[serde(rename(serialize = "mmd", deserialize = "mmd"))]
    Mmd,
    #[serde(rename(serialize = "mips", deserialize = "mips"))]
    Mips,
    #[serde(rename(serialize = "nar", deserialize = "nar"))]
    Nar,
    #[serde(rename(serialize = "nf", deserialize = "nf"))]
    Nf,
    #[serde(rename(serialize = "nu", deserialize = "nu"))]
    Nu,
    #[serde(rename(serialize = "objc", deserialize = "objc"))]
    Objc,
    #[serde(rename(serialize = "pot", deserialize = "pot"))]
    Pot,
    #[serde(rename(serialize = "potx", deserialize = "potx"))]
    Potx,
    #[serde(rename(serialize = "ps", deserialize = "ps"))]
    Ps,
    #[serde(rename(serialize = "ps1", deserialize = "ps1"))]
    Ps1,
    #[serde(rename(serialize = "protobuf", deserialize = "protobuf"))]
    Protobuf,
    #[serde(rename(serialize = "jade", deserialize = "jade"))]
    Jade,
    #[serde(rename(serialize = "py", deserialize = "py"))]
    Py,
    #[serde(rename(serialize = "perl6", deserialize = "perl6"))]
    Perl6,
    #[serde(rename(serialize = "regex", deserialize = "regex"))]
    Regex,
    #[serde(rename(serialize = "rb", deserialize = "rb"))]
    Rb,
    #[serde(rename(serialize = "rs", deserialize = "rs"))]
    Rs,
    #[serde(rename(serialize = "1c-query", deserialize = "1c-query"))]
    OneCQuery,
    #[serde(rename(serialize = "shader", deserialize = "shader"))]
    Shader,
    #[serde(rename(serialize = "bash", deserialize = "bash"))]
    Bash,
    #[serde(rename(serialize = "sh", deserialize = "sh"))]
    Sh,
    #[serde(rename(serialize = "shell", deserialize = "shell"))]
    Shell,
    #[serde(rename(serialize = "zsh", deserialize = "zsh"))]
    Zsh,
    #[serde(rename(serialize = "console", deserialize = "console"))]
    Console,
    #[serde(rename(serialize = "closure-templates", deserialize = "closure-templates"))]
    ClosureTemplates,
    #[serde(rename(serialize = "spl", deserialize = "spl"))]
    Spl,
    #[serde(rename(serialize = "styl", deserialize = "styl"))]
    Styl,
    #[serde(rename(serialize = "talon", deserialize = "talon"))]
    Talon,
    #[serde(rename(serialize = "tf", deserialize = "tf"))]
    Tf,
    #[serde(rename(serialize = "tfvars", deserialize = "tfvars"))]
    Tfvars,
    #[serde(rename(serialize = "lit", deserialize = "lit"))]
    Lit,
    #[serde(rename(serialize = "ts", deserialize = "ts"))]
    Ts,
    #[serde(rename(serialize = "tsp", deserialize = "tsp"))]
    Tsp,
    #[serde(rename(serialize = "typ", deserialize = "typ"))]
    Typ,
    #[serde(rename(serialize = "cmd", deserialize = "cmd"))]
    Cmd,
    #[serde(rename(serialize = "vim", deserialize = "vim"))]
    Vim,
    #[serde(rename(serialize = "vimscript", deserialize = "vimscript"))]
    Vimscript,
    #[serde(rename(serialize = "vy", deserialize = "vy"))]
    Vy,
    #[serde(rename(serialize = "mediawiki", deserialize = "mediawiki"))]
    Mediawiki,
    #[serde(rename(serialize = "wiki", deserialize = "wiki"))]
    Wiki,
    #[serde(rename(serialize = "wl", deserialize = "wl"))]
    Wl,
    #[serde(rename(serialize = "yml", deserialize = "yml"))]
    Yml,
}

