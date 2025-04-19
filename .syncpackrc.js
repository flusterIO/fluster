// @ts-check
/** @type {import("syncpack").RcFile} */
const config = {
    sortPackages: true,
    formatRepository: true,
    sortFirst: [
        "name",
        "version",
        "homepage",
        "keywords",
        "funding",
        "author",
        "contributors",
        "type",
        "private",
        "publishConfig",
        "bin",
        "files",
        "scripts",
        "wireit",
        "types",
        "main",
        "exports",
        "engines",
        "dependencies",
        "devDependencies",
        "peerDependencies",
        "prisma",
        "prettier",
        "xo",
        "ava",
        "packageManager",
        "ulld-pluginConfig",
        "pnpm",
        "release-it",
        "commitlint",
        "license",
        "dum-commit",
    ],
    dependencyTypes: ["prod", "dev", "peer"],
    semverGroups: [
        {
            label: "use exact version numbers in production",
            packages: ["**"],
            dependencyTypes: ["prod", "dev", "peer"],
            dependencies: ["**"],
            range: "",
        },
    ],
    versionGroups: [],
};

/* @ts-ignore */
module.exports = config;
