import type { Preview } from "@storybook/react-vite";
import "../src/themes.scss";
import { withThemeByClassName } from "@storybook/addon-themes";
import { themes } from "storybook/theming";

export const parameters = {
    darkMode: {
        // Override the default dark theme
        dark: { ...themes.dark, appBg: "black" },
        // Override the default light theme
        light: { ...themes.normal, appBg: "white" },
    },
};

export const decorators = [
    withThemeByClassName({
        themes: {
            light: "light",
            dark: "dark",
        },
        defaultTheme: "light",
    }),
];

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    tags: ["autodocs"],
};

export default preview;
