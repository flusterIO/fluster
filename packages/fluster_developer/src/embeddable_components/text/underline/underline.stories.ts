import type { Meta, StoryObj } from "@storybook/react-vite";
import { Ul } from ".";

const meta = {
    title: "Embeddable Components/Ul",
    component: Ul,
    parameters: {
        children: "My highlighted text",
        color: "primary",
    },
} satisfies Meta<typeof Ul>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        children: "Primary text",
        label: "Primary",
        color: "primary",
    },
};
