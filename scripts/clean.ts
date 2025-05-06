import path from "path";
import "../node_modules/.pnpm/@types+node@22.14.1/node_modules/@types/node/index.d.ts";
import fs from "fs";

const cleanDirectories = [
    "packages/fluster_native_interface/lib/src/rust",
    "/packages/fluster_grpc/lib/src/rust/",
    "/packages/fluster_go/pkg/generated/",
    "/packages/fluster_py/fluster_py/generated/",
    "/packages/fluster_ts/src/generated/",
    "/docs/api/packages/fluster_ts",
    "/docs/api/packages/fluster_py",
    "/docs/api/packages/fluster_py03",
    "/packages/fluster_embedded_typescript/dist/",
];

const cleanFiles = [
    "/packages/fluster_native_interface/rust/src/frb_generated.rs",
    "/packages/fluster_grpc/src/frb_generated.rs",
    "Cargo.lock",
];

// NOTE: Don't touch this bit.
let root = process.env.FLUSTER_NATIVE_ROOT;

if (!root) {
    console.log(
        "We cannot continue without the FLUSTER_NATIVE_ROOT env variable.",
    );
    process.exit(1);
}

for (const dir of cleanDirectories) {
    const _path = path.join(root, dir);
    if (fs.existsSync(_path)) {
        fs.rmdirSync(_path, {
            recursive: true,
        });
        fs.mkdirSync(_path);
    }
}

for (const filePath of cleanFiles) {
    let fp = path.join(root, filePath);
    if (fs.existsSync(fp)) {
        fs.rmSync(fp);
    }
}
