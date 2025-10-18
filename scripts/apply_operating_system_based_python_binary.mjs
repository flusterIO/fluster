import os from "node:os";
import path from "path";
import fs from "fs";

const tauriConfigPath = path.join(
    import.meta.dirname,
    "..",
    "apps",
    "fluster",
    "src-tauri",
    "tauri.conf.json"
);

const tauriConfig = JSON.parse(
    fs.readFileSync(tauriConfigPath, {
        encoding: "utf-8",
    })
);

switch (os.platform()) {
    case "linux": {
        tauriConfig.bundle.externalBin = [
            "../src-python/fluster_sidecar_api/build/fluster_python_sidecar/fluster_python_sidecar",
        ];
        break;
    }

    case "darwin": {
        tauriConfig.bundle.externalBin = [
            "../src-python/fluster_sidecar_api/build/fluster_python_sidecar/fluster_python_sidecar",
        ];
        break;
    }

    case "win32": {
        tauriConfig.bundle.externalBin = [
            "../src-python/fluster_sidecar_api/build/fluster_python_sidecar/fluster_python_sidecar.exe",
        ];
        break;
    }
}

fs.writeFileSync(tauriConfigPath, JSON.stringify(tauriConfig, null, 2));
