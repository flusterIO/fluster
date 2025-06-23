// export interface WebsiteNavItem {

// }

const baseUrl = "https://fluster.vercel.app";

export interface StaticWebsiteContent {
    links: {
        docs: {
            internal: {
                /// Link to internal documentation on organizing notes inside of fluster.
                organization_docs: string;
                home: string;
            };
            external: {
                jupyter: string;
                python: string;
                /// Link to a repo with a ton of popular csl citation formats.
                cslRepo: string;
                monaco: string;
            };
        };

        demos: {
            myNotes: string;
        };
        videoDemo: string;
    };
}

export const staticContent: StaticWebsiteContent = {
    links: {
        docs: {
            internal: {
                home: baseUrl,
                organization_docs: baseUrl,
            },
            external: {
                jupyter: "jupyter-notebook.readthedocs.io",
                python: "docs.python.org",
                cslRepo: "https://github.com/citation-style-language/styles",
                monaco: "https://microsoft.github.io/monaco-editor",
            },
        },
        demos: {
            myNotes: "/myWork",
        },
        videoDemo: "https://www.youtube.com/watch?v=zzeE1sIphe0&t=4s",
    },
};
