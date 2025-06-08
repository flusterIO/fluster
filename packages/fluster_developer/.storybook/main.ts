import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(mjs|ts|tsx)"],
    addons: [
        "@storybook/addon-onboarding",
        "storybook-dark-mode",
        "@chromatic-com/storybook",
        "@storybook/addon-vitest",
        "@storybook/addon-themes",
        "@storybook/addon-docs",
        "storybook-addon-data-theme-switcher",
    ],
    framework: {
        name: "@storybook/react-vite",
        options: {},
    },
};
export default config;
