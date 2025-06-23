// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Admonition } from "./index";
import React from "react";

const meta = {
    component: Admonition,
    title: "Embeddable Components/Admonition",
} satisfies Meta<typeof Admonition>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Foldable = {
    args: {
        foldable: true,
        title: "Test foldable admonition",
        type: "info",
        children: <p>My simple admonition body here.</p>,
        folded: false,
        InlineMdxContent: ({ mdx }: { mdx: string }) => mdx,
    },
} satisfies Story;
