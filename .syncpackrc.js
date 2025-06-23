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
    customTypes: {
        engines: {
            path: "engines",
            strategy: "versionsByName",
        },
        // packageManager: {
        //     path: "pnpm",
        //     strategy: "pnpm@9.7.1",
        // },
    },
    versionGroups: [
        {
            dependencyTypes: ["dev"],
            dependencies: ["@types/react-dom"],
            pinVersion: "19.1.5",
            label: "pin @types/react-dom",
        },
        {
            dependencyTypes: ["dev"],
            dependencies: ["@types/react"],
            pinVersion: "19.1.5",
            label: "pin @types/react",
        },
        {
            dependencies: ["react"],
            pinVersion: "19.1.0",
            label: "Pin react in packages.",
        },

        {
            dependencies: ["react-dom"],
            pinVersion: "19.1.0",
            label: "Pin react-dom in packages.",
        },
    ],
};

/* @ts-ignore */
module.exports = config;
