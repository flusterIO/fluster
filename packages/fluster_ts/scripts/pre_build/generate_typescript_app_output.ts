import path from "path";
import { bundledThemes, bundledLanguages } from "shiki";
import fs from "fs";

let nativeRoot = process.env.FLUSTER_NATIVE_ROOT;

if (!nativeRoot) {
    console.log(
        `Cannot continue without the FLUSTER_NATIVE_ROOT environment variable.`,
    );
    process.exit(1);
}

const defaultTheme = "dracula";
const defaultLanguage = "python";

let output_dir = path.join(
    nativeRoot,
    "packages",
    "fluster_models",
    "src",
    "api",
    "models",
    "nested_models",
    "code",
);

enum SourceType {
    language,
    theme,
}

const formatEnumString = (val: String): String => {
    let s = val
        .replace("1c", "OneC")
        .split("-")
        .map((x) => `${x[0].toUpperCase()}${x.slice(1, x.length)}`)
        .join("")
        .replaceAll("-", "")
        .replaceAll("+", "Plus")
        .replaceAll("#", "Sharp");
    return `${s[0].toUpperCase()}${s.slice(1, s.length)}`;
};

const getDefaultString = (val: String, sourceType: SourceType): String => {
    if (sourceType == SourceType.theme && val == defaultTheme) {
        return `\n    #[default]`;
    }

    if (sourceType == SourceType.language && val == defaultLanguage) {
        return `\n    #[default]`;
    }
    return "";
};

let themeEnumString = `use serde::{Deserialize, Serialize};

/** Themes generated from shiki. */
#[derive(Debug, Serialize, Deserialize, Clone, Default)]
pub enum SupportedSyntaxTheme {`;
let languageEnumString = `use serde::{Deserialize, Serialize};

/** Languages generated from shiki. */
#[derive(Debug, Serialize, Deserialize, Clone, Default)]
pub enum SupportedSyntaxLanguage {`;

for (const theme in bundledThemes) {
    themeEnumString += `\n    #[serde(rename(serialize = "${theme}", deserialize = "${theme}"))]${getDefaultString(theme, SourceType.theme)}
    ${formatEnumString(theme)},`;
}

for (const lang in bundledLanguages) {
    languageEnumString += `\n    #[serde(rename(serialize = "${lang}", deserialize = "${lang}"))]${getDefaultString(lang, SourceType.language)}
    ${formatEnumString(lang)},`;
}

themeEnumString += "\n}";
languageEnumString += "\n}";

fs.writeFileSync(
    path.join(output_dir, "supported_syntax_theme.rs"),
    themeEnumString,
    {
        encoding: "utf-8",
    },
);
fs.writeFileSync(
    path.join(output_dir, "supported_syntax_language.rs"),
    languageEnumString,
    {
        encoding: "utf-8",
    },
);
