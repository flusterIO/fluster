import fs, { PathOrFileDescriptor } from "fs";
import yaml from "yaml";
import toml from "toml";
import path from "path";

class PubspecFile {
    p: string;
    version: String;
    constructor(p: string, version: string) {
        this.p = p;
        this.version = version;
    }
    getData(): string {
        const fileContent = fs.readFileSync(this.p as PathOrFileDescriptor, {
            encoding: "utf-8",
        });
        let yam = {
            ...yaml.parse(fileContent),
            version: this.version,
        };
        return yaml.stringify(yam);
    }
}

class PackageJsonFile {
    p: string;
    version: String;
    constructor(p: string, version: string) {
        this.p = p;
        this.version = version;
    }
    getData(): string {
        const fileContent = fs.readFileSync(this.p as PathOrFileDescriptor, {
            encoding: "utf-8",
        });
        let data = JSON.parse(fileContent);
        data.version = this.version;
        return JSON.stringify(data);
    }
}

class CargoTomlFile {
    p: string;
    version: string;
    constructor(p: string, version: string) {
        this.p = p;
        this.version = version;
    }
    getData(): string {
        const fileContent = fs.readFileSync(this.p as PathOrFileDescriptor, {
            encoding: "utf-8",
        });

        let tom = toml.parse(fileContent);
        let vString = `version = "${tom.version}"`;
        return fileContent.replace(vString, `version = "${this.version}"`);
    }
}

class PythonVersionInitFile {
    p: string;
    version: String;
    constructor(p: string, version: string) {
        this.p = p;
        this.version = version;
    }
    getData() {
        return `__version__ = "${this.version}"`;
    }
}

let root = process.env.FLUSTER_NATIVE_ROOT;

if (!root) {
    console.log(
        `We can't continue without the FLUSTER_NATIVE_ROOT env variable.`,
    );
    throw Error(
        "We can't continue without the FLUSTER_NATIVE_ROOT env variable.",
    );
}

const setPackageVersion = (version: string): void => {
    let items: Array<CargoTomlFile | PubspecFile> = [
        new CargoTomlFile(path.join(root!, "cargo.toml"), version),
        new PubspecFile(path.join(root!, "apps/fluster/pubspec.yaml"), version),
        new PubspecFile(
            path.join(root!, "packages/fluster_native_interface/pubspec.yaml"),
            version,
        ),
        new PubspecFile(
            path.join(root!, "packages/fluster_ui/pubspec.yaml"),
            version,
        ),
        new PackageJsonFile(
            path.join(root!, "packages/fluster_ts/package.json"),
            version,
        ),
        new PackageJsonFile(
            path.join(root!, "packages/fluster_embedded_components/package.json"),
            version,
        ),
        new PythonVersionInitFile(
            path.join(root!, "packages/fluster_py/src/__init__.py"),
            version,
        ),
    ];

    for (const item of items) {
        let data = item.getData();
        fs.writeFileSync(item.p, data, {
            encoding: "utf-8",
        });
    }
};

let version = process.env.FLUSTER_VERSION;

if (!version) {
    console.log(`We can't continue without the FLUSTER_VERSION env variable.`);
    throw Error("We can't continue without the FLUSTER_VERSION env variable.");
}

setPackageVersion(version!);
