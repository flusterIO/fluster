import fs from 'fs';
import path from 'path';
import { execSync } from "child_process";

const sidecarDir = path.join(
    import.meta.dirname,
    "..",
    "apps",
    "fluster",
    "src-python",
    "fluster_sidecar_api"
)

const installScript = `uv sync --directory ${sidecarDir}`

const res = execSync(installScript, {
    encoding: "utf-8"
})

console.log(res)

const compileScript = `${path.join(sidecarDir, ".venv", "bin", "pyinstaller")} --name fluster_python_sidecar --onefile --distpath ${path.join(sidecarDir, "dist")} --workpath ${path.join(sidecarDir, "build")} --specpath ${sidecarDir} ${path.join(sidecarDir, "main.py")}`


const res2 = execSync(compileScript, {
    encoding: "utf-8"
})

console.log(res2)


// -- Rename Python Binary --
const extension = process.platform === "win32" ? ".exe" : "";

const existingPath = path.join(
    sidecarDir,
    "dist",
    `fluster_python_sidecar`
);

const rustInfo = execSync("rustc -vV");
const targetTriple = /host: (\S+)/g.exec(rustInfo)[1];
if (!targetTriple) {
    console.error("Failed to determine platform target triple");
}
fs.renameSync(
    `${existingPath}${extension}`,
    `${existingPath}-${targetTriple}${extension}`
);
