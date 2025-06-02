// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SnippetModal } from "./index";

const meta = {
    component: SnippetModal,
} satisfies Meta<typeof SnippetModal>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic = {
    args: {
        themes: {
            dark: "dracula",
            light: "github-light",
        },
        darkMode: true,
        data: {
            label: "My snippet label",
            body: "def gamma():\n    x*y;",
            desc: "Dolor sed in dignissim, et at sed, tincidunt felis sit. Egestas velit nunc sed suspendisse ut auctor ac, arcu neque. Fringilla in sed, ante condimentum convallis euismod gravida quis eget. Molestie fusce fusce ante, ut ac convallis eleifend, tincidunt mus. Dui dui, ante in sed justo amet lectus eget, gravida.",
            lang: "python",
            ctime: new Date().toISOString(),
            utime: new Date().toISOString(),
            tags: "Amet massa mus felis ante metus proin habitasse arcu velit".split(
                " "
            ),
        },
    },
} satisfies Story;
