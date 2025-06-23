import fs from "fs";
import { globSync } from "glob";

const files = globSync("**/*.{ts,tsx}", {
    ignore: ["**/node_modules/", "**/dist/**"],
    absolute: true,
}).filter((f) => !f.includes("node_modules"));

const queries = ["useState", "useEffect", "useContext", "onClick"];

for (const file of files) {
    let content = fs.readFileSync(file, {
        encoding: "utf-8",
    });
    let matchesQuery = queries.some((s) => new RegExp(s).test(content));
    if (matchesQuery && !content.startsWith('"use client"')) {
        console.log("file: ", file);
    }
}
