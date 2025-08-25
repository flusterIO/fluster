/* eslint-disable  --  */
// import { createPreset } from "fumadocs-ui/tailwind-plugin";
import { Config } from "tailwindcss/types/config";
import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";

const flattenColorPalette = (colors: any): any =>
    Object.assign(
        {},
        ...Object.entries(
            colors !== null && colors !== void 0 ? colors : {}
        ).flatMap(([color, values]: any) =>
            typeof values == "object"
                ? Object.entries(flattenColorPalette(values)).map(([number, hex]) => ({
                    [color + (number === "DEFAULT" ? "" : `-${number}`)]: hex,
                }))
                : [
                    {
                        [`${color}`]: values,
                    },
                ]
        )
    );

const tailwindCfg: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./content/**/*.mdx",
        "../../packages/fluster_developer/src/**/*.{js,ts,jsx,tsx,mdx}",
        "./src-tauri/src/features/embedded_docs/embedded_docs/**/*.{md,mdx}",
    ],
    darkMode: "class",
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
            colors: () => ({
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                brand: "hsl(var(--brand))",
                lightBlue: {
                    "100": "#E0F2FE",
                    "200": "#BAE6FD",
                    "300": "#7DD3FC",
                    "400": "#38BDF8",
                    "500": "#0EA5E9",
                    "600": "#0284C7",
                    "700": "#0369A1",
                    "800": "#075985",
                    "900": "#1E3A8A",
                },
                hint: "hsl(var(--fluster-hint))",
                error: "hsl(var(--fluster-error))",
                link: "hsl(var(--general-link-color))",
                fluster_info: "hsl(var(--fluster-info))",
                fluster_error: "hsl(var(--fluster-error))",
                fluster_note: "hsl(var(--fluster-note))",
                fluster_tip: "hsl(var(--fluster-tip))",
                fluster_faq: "hsl(var(--fluster-faq))",
                fluster_practice: "hsl(var(--fluster-practice))",
                fluster_abstract: "hsl(var(--fluster-abstract))",
                fluster_todo: "hsl(var(--fluster-todo))",
                fluster_success: "hsl(var(--fluster-success))",
                fluster_warn: "hsl(var(--fluster-warn))",
                fluster_fail: "hsl(var(--fluster-fail))",
                fluster_example: "hsl(var(--fluster-example))",
                fluster_quote: "hsl(var(--fluster-quote))",
                fluster_cite: "hsl(var(--fluster-cite))",
                fluster_equation: "hsl(var(--fluster-equation))",
                fluster_definition: "hsl(var(--fluster-definition))",
                fluster_important: "hsl(var(--fluster-important))",
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
        typography,
        containerQueries,
        function addVariablesForColors({ addBase, theme }: any) {
            const allColors = flattenColorPalette(theme("colors"));
            const newVars = Object.fromEntries(
                Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
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
