// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CodeBlock } from "./code_block";

const meta = {
    component: CodeBlock,
} satisfies Meta<typeof CodeBlock>;
export default meta;

type Story = StoryObj<typeof meta>;

export const DarkMode = {
    args: {
        themes: {
            dark: "dracula",
            light: "github-light",
        },
        code: "def gamma(): \n x*y;",
        darkMode: true,
        lang: "python",
    },
} satisfies Story;

export const LightMode = {
    args: {
        themes: {
            dark: "dracula",
            light: "github-light",
        },
        code: "def gamma(): \n x*y;",
        darkMode: false,
        lang: "python",
    },
} satisfies Story;
