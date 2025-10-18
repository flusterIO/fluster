import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const extension = process.platform === "win32" ? ".exe" : "";

const existingPath = path.join(
    import.meta.dirname,
    "..",
    "apps",
    "fluster",
    "src-python",
    "fluster_sidecar_api",
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
