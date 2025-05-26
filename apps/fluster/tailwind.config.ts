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
        "../../packages/fluster_ui/src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
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
                hint: "var(--ulld-hint)",
                error: "var(--ulld-error)",
                link: "var(--general-link-color)",
                fluster_info: "var(--fluster-info)",
                fluster_error: "var(--fluster-error)",
                fluster_note: "var(--fluster-note)",
                fluster_tip: "var(--fluster-tip)",
                fluster_faq: "var(--fluster-faq)",
                fluster_practice: "var(--fluster-practice)",
                fluster_abstract: "var(--fluster-abstract)",
                fluster_todo: "var(--fluster-todo)",
                fluster_success: "var(--fluster-success)",
                fluster_warn: "var(--fluster-warn)",
                fluster_fail: "var(--fluster-fail)",
                fluster_example: "var(--fluster-example)",
                fluster_quote: "var(--fluster-quote)",
                fluster_cite: "var(--fluster-cite)",
                fluster_equation: "var(--fluster-equation)",
                fluster_definition: "var(--fluster-definition)",
                fluster_important: "var(--fluster-important)",
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
