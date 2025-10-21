#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { execSync } from "child_process";

console.log("dirName: ", import.meta.dirname);

const sidecarDir = path.join(
    import.meta.dirname,
    "..",
    "apps",
    "fluster",
    "src-python",
    "fluster_sidecar_api"
);

const extension = process.platform === "win32" ? ".exe" : "";

const installScript = `uv sync --directory ${sidecarDir}`;

const res = execSync(installScript, {
    encoding: "utf-8",
});

console.log(res);

const uvPath = path.join(
    sidecarDir,
    ".venv",
    process.platform === "win32" ? "Scripts" : "bin",
    `pyinstaller${extension}`
);

const compileScript = `${uvPath} --name fluster_python_sidecar --onefile --distpath ${path.join(
    sidecarDir,
    "dist"
)} --workpath ${path.join(
    sidecarDir,
    "build"
)} --specpath ${sidecarDir} ${path.join(sidecarDir, "main.py")}`;

const res2 = execSync(compileScript, {
    encoding: "utf-8",
});

console.log(res2);

// -- Rename Python Binary --

const existingPath = path.join(sidecarDir, "dist", `fluster_python_sidecar`);

const rustInfo = execSync("rustc -vV");
const targetTriple = /host: (\S+)/g.exec(rustInfo)[1];
if (!targetTriple) {
    console.error("Failed to determine platform target triple");
}

console.log("process.architecture: ", process.architecture);
console.log("process.platform: ", process.platform);
if (process.platform === "darwin" && process.architecture === "x64") {
    fs.copyFileSync(
        `${existingPath}${extension}`,
        `${existingPath}-x86_64-apple-darwin${extension}`
    );
} else {
    fs.copyFileSync(
        `${existingPath}${extension}`,
        `${existingPath}-${targetTriple}${extension}`
    );
}
