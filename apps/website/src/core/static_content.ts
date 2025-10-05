const baseUrl = "https://flusterapp.com";

export const staticContent = {
  links: {
    comingSoon: "/coming_soon",
    sponsor: "/sponsor",
    social: {
      github: "https://github.com/flusterIO/fluster",
      twitter: "https://x.com/fluster_app",
      discord: "https://discord.gg/FUA88wwqUM",
      subreddit: "https://www.reddit.com/r/Fluster_app/",
      bluesky: "https://bsky.app/profile/flusterio.bsky.social",
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
        userHome: "/docs/user",
        developerHome: "/docs/developer",
        organization_docs: baseUrl,
      },
      external: {
        jupyter: "jupyter-notebook.readthedocs.io",
        python: "docs.python.org",
        cslRepo: "https://github.com/citation-style-language/styles",
        monaco: "https://microsoft.github.io/monaco-editor",
      },
    },
    videoDemo: "https://youtu.be/JzXKVj__TMw",
  },
} as const;

export type StaticWebsiteContent = typeof staticContent;
