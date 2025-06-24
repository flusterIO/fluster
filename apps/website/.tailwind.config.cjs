"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var typography_1 = require("@tailwindcss/typography");
var container_queries_1 = require("@tailwindcss/container-queries");
var mini_svg_data_uri_1 = require("mini-svg-data-uri");
var tailwindcss_animate_1 = require("tailwindcss-animate");
/* eslint-disable-next-line  --  */
var flattenColorPalette = function (colors) {
    return Object.assign.apply(Object, __spreadArray([{}], Object.entries(colors !== null && colors !== void 0 ? colors : {}
    /* eslint-disable-next-line  --  */
    ).flatMap(function (_a) {
        var _b;
        var color = _a[0], values = _a[1];
        return typeof values == "object"
            ? Object.entries(flattenColorPalette(values)).map(function (_a) {
                var _b;
                var number = _a[0], hex = _a[1];
                return (_b = {},
                    _b[color + (number === "DEFAULT" ? "" : "-".concat(number))] = hex,
                    _b);
            })
            : [
                (_b = {},
                    _b["".concat(color)] = values,
                    _b),
            ];
    }), false));
};
var tailwindCfg = {
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
            typography: '({ theme }: { theme: (val: string) => void }) => ({\\\\\\\\\\\\\\\\n        DEFAULT: {\\\\\\\\\\\\\\\\n          css: {\\\\\\\\\\\\\\\\n            "--tw-prose-invert-body": theme("colors.gray[200]"),\\\\\\\\\\\\\\\\n            "--tw-prose-invert-headings": "hsl(var(--foreground))",\\\\\\\\\\\\\\\\n            pre: {\\\\\\\\\\\\\\\\n              "&:not([data-language])": {\\\\\\\\\\\\\\\\n                backgroundColor: "hsl(var(--background))",\\\\\\\\\\\\\\\\n              },\\\\\\\\\\\\\\\\n            },\\\\\\\\\\\\\\\\n          },\\\\\\\\\\\\\\\\n        },\\\\\\\\\\\\\\\\n      })',
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
        typography_1.default,
        container_queries_1.default,
        /* eslint-disable-next-line  --  */
        function addVariablesForColors(_a) {
            var addBase = _a.addBase, theme = _a.theme;
            var allColors = flattenColorPalette(theme("colors"));
            var newVars = Object.fromEntries(Object.entries(allColors).map(function (_a) {
                var key = _a[0], val = _a[1];
                return ["--".concat(key), val];
            }));
            addBase({
                ":root": newVars,
            });
        },
        /* eslint-disable-next-line  --  */
        function (_a) {
            var matchUtilities = _a.matchUtilities, theme = _a.theme;
            matchUtilities({
                /* eslint-disable-next-line  --  */
                "bg-grid": function (value) { return ({
                    backgroundImage: "url(\"".concat((0, mini_svg_data_uri_1.default)("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\" width=\"32\" height=\"32\" fill=\"none\" stroke=\"".concat(value, "\"><path d=\"M0 .5H31.5V32\"/></svg>")), "\")"),
                }); },
                /* eslint-disable-next-line  --  */
                "bg-grid-small": function (value) { return ({
                    backgroundImage: "url(\"".concat((0, mini_svg_data_uri_1.default)("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\" width=\"8\" height=\"8\" fill=\"none\" stroke=\"".concat(value, "\"><path d=\"M0 .5H31.5V32\"/></svg>")), "\")"),
                }); },
                /* eslint-disable-next-line  --  */
                "bg-dot-thick": function (value) { return ({
                    backgroundImage: "url(\"".concat((0, mini_svg_data_uri_1.default)("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\" width=\"16\" height=\"16\" fill=\"none\"><circle fill=\"".concat(value, "\" id=\"pattern-circle\" cx=\"10\" cy=\"10\" r=\"2.5\"></circle></svg>")), "\")"),
                }); },
            }, {
                values: flattenColorPalette(theme("backgroundColor")),
                type: "color",
            });
        },
        tailwindcss_animate_1.default,
        // createPreset(),
    ],
    // presets: [createPreset()],
};
exports.default = tailwindCfg;
