// import { createPreset } from "fumadocs-ui/tailwind-plugin";
import { Config } from "tailwindcss/types/config";
import typpgraphy from "@tailwindcss/typography";

const flattenColorPalette = (colors: any): any =>
    Object.assign(
        {},
        ...Object.entries(
            colors !== null && colors !== void 0 ? colors : {},
        ).flatMap(([color, values]: any) =>
            typeof values == "object"
                ? Object.entries(flattenColorPalette(values)).map(([number, hex]) => ({
                    [color + (number === "DEFAULT" ? "" : `-${number}`)]: hex,
                }))
                : [
                    {
                        [`${color}`]: values,
                    },
                ],
        ),
    );

const tailwindCfg: Config = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./content/**/*.mdx"],
    theme: {
        extend: {
            screens: {
                xxs: "450px",
                blogMobile: "840px",
                navbarFull: "1024px",
                navbarPartial: "768px",
                smedium: "680px",
            },
            transitionDelay: {
                "400": "400ms",
            },
            fontFamily: {
                sans: ["var(--ulld-app-font)"],
                code: [
                    "ui-monospace",
                    "SFMono-Regular",
                    "Menlo",
                    "Monaco",
                    "Consolas",
                    "Liberation Mono",
                    "Courier New",
                    "monospace",
                ],
            },
            colors: (cfg) => ({
                hint: "#39f614",
                link: "#1e90ff",
                error: cfg.colors.red["500"],
            }),
            maxWidth: {
                content: "1440px",
            },
            height: {
                "screen-noNav": "calc(100vh - 76px)",
            },
            minHeight: {
                "screen-noNav": "calc(100vh - 76px)",
            },
            maxHeight: {
                "screen-noNav": "calc(100vh - 76px)",
            },
            typography: ({ theme }: { theme: (val: string) => void }) => ({
                DEFAULT: {
                    css: {
                        "--tw-prose-invert-body": theme("colors.gray[200]"),
                        "--tw-prose-invert-headings": "hsl(var(--foreground))",
                        pre: {
                            "&:not([data-language])": {
                                backgroundColor: "hsl(var(--background))",
                            },
                        },
                    },
                },
            }),
        },
    },
    plugins: [
        typpgraphy,
        function addVariablesForColors({ addBase, theme }: any) {
            let allColors = flattenColorPalette(theme("colors"));
            let newVars = Object.fromEntries(
                Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
            );
            addBase({
                ":root": newVars,
            });
        },
        function ({ matchUtilities, theme }: any) {
            matchUtilities({
                values: flattenColorPalette(theme("backgroundColor")),
                type: "color",
            });
        },
    ],
    // presets: [createPreset()],
};

export default tailwindCfg;
