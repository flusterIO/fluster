// eslint-allow @typescript-eslint/no-explicit-any -- Need to log to console. #MoveToLoggerPackage
// import { createPreset } from "fumadocs-ui/tailwind-plugin";
import { Config } from "tailwindcss/types/config";
import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import svgToDataUri from "mini-svg-data-uri";
import tailwindAnimate from "tailwindcss-animate";

/* eslint-disable-next-line  --  */
const flattenColorPalette = (colors: any): any =>
    Object.assign(
        {},
        ...Object.entries(
            colors !== null && colors !== void 0 ? colors : {}
            /* eslint-disable-next-line  --  */
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
    darkMode: ["class"],
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./content/**/*.mdx",
        "../../packages/fluster_developer/src/**/*.{js,ts,jsx,tsx,mdx}",
        "../../node_modules/fumadocs-ui/dist/**/*.{js,ts,tsx,jsx,mdx}",
        "../../docs/website/**/*.{mdx,tsx,jsx,ts,js}",
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
            colors: {
                background: {
                    DEFAULT: "hsl(var(--background))",
                },
                foreground: {
                    DEFAULT: "hsl(var(--foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: {
                    DEFAULT: "hsl(var(--border))",
                },
                input: {
                    DEFAULT: "hsl(var(--input))",
                },
                ring: {
                    DEFAULT: "hsl(var(--ring))",
                },
                chart: {
                    "1": "hsl(var(--chart-1))",
                    "2": "hsl(var(--chart-2))",
                    "3": "hsl(var(--chart-3))",
                    "4": "hsl(var(--chart-4))",
                    "5": "hsl(var(--chart-5))",
                },
                sidebar: {
                    DEFAULT: "hsl(var(--sidebar-background))",
                    foreground: "hsl(var(--sidebar-foreground))",
                    primary: "hsl(var(--sidebar-primary))",
                    "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
                    accent: "hsl(var(--sidebar-accent))",
                    "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
                    border: "hsl(var(--sidebar-border))",
                    ring: "hsl(var(--sidebar-ring))",
                },
            },
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
            typography:
                '({ theme }: { theme: (val: string) => void }) => ({\\\\\\\\\\\\\\\\n        DEFAULT: {\\\\\\\\\\\\\\\\n          css: {\\\\\\\\\\\\\\\\n            "--tw-prose-invert-body": theme("colors.gray[200]"),\\\\\\\\\\\\\\\\n            "--tw-prose-invert-headings": "hsl(var(--foreground))",\\\\\\\\\\\\\\\\n            pre: {\\\\\\\\\\\\\\\\n              "&:not([data-language])": {\\\\\\\\\\\\\\\\n                backgroundColor: "hsl(var(--background))",\\\\\\\\\\\\\\\\n              },\\\\\\\\\\\\\\\\n            },\\\\\\\\\\\\\\\\n          },\\\\\\\\\\\\\\\\n        },\\\\\\\\\\\\\\\\n      })',
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: {
                        height: "0",
                    },
                    to: {
                        height: "var(--radix-accordion-content-height)",
                    },
                },
                "accordion-up": {
                    from: {
                        height: "var(--radix-accordion-content-height)",
                    },
                    to: {
                        height: "0",
                    },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [
        typography,
        containerQueries,
        /* eslint-disable-next-line  --  */
        function addVariablesForColors({ addBase, theme }: any) {
            const allColors = flattenColorPalette(theme("colors"));
            const newVars = Object.fromEntries(
                Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
            );
            addBase({
                ":root": newVars,
            });
        },
        /* eslint-disable-next-line  --  */
        function ({ matchUtilities, theme }: any) {
            matchUtilities(
                {
                    /* eslint-disable-next-line  --  */
                    "bg-grid": (value: any) => ({
                        backgroundImage: `url("${svgToDataUri(
                            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
                        )}")`,
                    }),
                    /* eslint-disable-next-line  --  */
                    "bg-grid-small": (value: any) => ({
                        backgroundImage: `url("${svgToDataUri(
                            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
                        )}")`,
                    }),
                    /* eslint-disable-next-line  --  */
                    "bg-dot-thick": (value: any) => ({
                        backgroundImage: `url("${svgToDataUri(
                            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle></svg>`
                        )}")`,
                    }),
                },
                {
                    values: flattenColorPalette(theme("backgroundColor")),
                    type: "color",
                }
            );
        },
        tailwindAnimate,
        // createPreset(),
    ],
    // presets: [createPreset()],
};

export default tailwindCfg;
