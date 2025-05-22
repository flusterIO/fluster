import React, { type ReactNode } from "react";
import { } from "@shikijs/transformers";

export const supportedLanguages = [
    "abap",
    "apex",
    "azcli",
    "bat",
    "bicep",
    "cameligo",
    "clojure",
    "coffee",
    "cpp",
    "csharp",
    "csp",
    "css",
    "cypher",
    "dart",
    "dockerfile",
    "ecl",
    "elixir",
    "flow9",
    "freemarker2",
    "fsharp",
    "go",
    "graphql",
    "handlebars",
    "hcl",
    "html",
    "ini",
    "java",
    "javascript",
    "json",
    "julia",
    "kotlin",
    "less",
    "lexon",
    "liquid",
    "lua",
    "m3",
    "markdown",
    "mdx",
    "mips",
    "msdax",
    "mysql",
    "objective-c",
    "pascal",
    "pascaligo",
    "perl",
    "pgsql",
    "php",
    "pla",
    "postiats",
    "powerquery",
    "powershell",
    "protobuf",
    "pug",
    "python",
    "qsharp",
    "r",
    "razor",
    "redis",
    "redshift",
    "restructuredtext",
    "ruby",
    "rust",
    "sb",
    "scala",
    "scheme",
    "scss",
    "shell",
    "solidity",
    "sophia",
    "sparql",
    "sql",
    "st",
    "swift",
    "systemverilog",
    "tcl",
    "twig",
    "typescript",
    "vb",
    "wgsl",
    "xml",
    "yaml",
    "latex",
];

interface SyntaxLanguageSelectProps<T extends boolean> {
    multi: T;
    value: T extends true ? string[] : string;
    onChange: (newVal: T extends true ? string[] : string) => void;
}

/* FIX: Implement this as well as all relevant app specific inputs. */
const SyntaxLanguageSelect = <T extends boolean>(
    {
        /* multi, */
        /* value, */
        /* onChange, */
    }: SyntaxLanguageSelectProps<T>,
): ReactNode => {
    let languages = supportedLanguages;
    return <div></div>;
};

SyntaxLanguageSelect.displayName = "SyntaxLanguageSelect";

export default SyntaxLanguageSelect;
