// export interface WebsiteNavItem {

// }

const baseUrl = "https://fluster.vercel.app";

export const staticContent = {
    links: {
        comingSoon: "/coming_soon",
        sponsor: "/sponsor",
        social: {
            github: "https://github.com/igloo1505/ulld",
            twitter: "https://x.com/uhlittlelessdum",
            discord: "https://discord.gg/FUA88wwqUM",
        },
        github: {
            releases: "https://github.com/flusterIO/fluster/releases",
        },
        fund: {
            paypalDonate: "https://www.paypal.com/ncp/payment/D6S6NP4AHJD6Y",
            patreon: "https://www.patreon.com/uhlittlelessdum/about",
            github: "https://github.com/flusterIO",
        },
        docs: {
            internal: {
                userHome: baseUrl,
                organization_docs: baseUrl,
            },
            external: {
                jupyter: "jupyter-notebook.readthedocs.io",
                python: "docs.python.org",
                cslRepo: "https://github.com/citation-style-language/styles",
                monaco: "https://microsoft.github.io/monaco-editor",
            },
        },
        videoDemo: "https://www.youtube.com/watch?v=zzeE1sIphe0&t=4s",
    },
} as const;

export type StaticWebsiteContent = typeof staticContent;
