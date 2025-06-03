import type { Preview } from "@storybook/react-vite";
import "../src/themes.scss";
import { withThemeByClassName } from "@storybook/addon-themes";
import { background, themes } from "storybook/theming";

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
        backgrounds: {
            options: {
                dark: { name: "Dark", value: "#333" },
                light: { name: "Light", value: "#F7F9F2" },
            },
        },
    },
    initialGlobals: {
        backgrounds: { value: "dark" },
    },
    tags: ["autodocs"],
};

export default preview;
