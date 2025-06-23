import type { Meta, StoryObj } from "@storybook/react-vite";
import { Hl } from ".";

const meta = {
    title: "Embeddable Components/Highlight",
    component: Hl,
    parameters: {
        children: "My highlighted text",
        color: "primary",
    },
} satisfies Meta<typeof Hl>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        children: "Primary text",
        label: "Primary",
        color: "primary",
    },
};
