import type { Preview } from "@storybook/react-vite";
import "../src/themes.scss";
import {
    withThemeByClassName,
    withThemeByDataAttribute,
} from "@storybook/addon-themes";
import { themes } from "storybook/internal/theming";
import { themes as flusterThemes } from "../src/utils/themes";
import type { ThemeConfig } from "storybook-addon-data-theme-switcher";

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
    withThemeByDataAttribute({
        defaultTheme: "fluster",
        attributeName: "data-fluster-theme",
        themes: {
            zinc: "zinc",
            yellow: "yellow",
            violet: "violet",
            fluster: "fluster",
            stone: "stone",
            slate: "slate",
            rose: "rose",
            red: "red",
            orange: "orange",
            neutral: "neutral",
            green: "green",
            gray: "gray",
            blue: "blue",
        },
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
        dataTheme: "fluster",
        dataThemes: {
            list: flusterThemes.map((theme) => {
                return {
                    name: theme,
                    dataTheme: theme,
                };
            }),
            dataAttribute: "data-fluster-theme",
            clearable: false,
            toolbar: {
                title: "Fluster theme",
                icon: "PaintBrushIcon",
            },
        } satisfies ThemeConfig,
    },
    tags: ["autodocs"],
};

export default preview;
