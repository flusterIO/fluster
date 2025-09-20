import { baseOptions } from "#/core/mdx/base_options";
import { RootToggle } from "fumadocs-ui/components/layout/root-toggle";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { TerminalIcon, UserIcon } from "lucide-react";
import type { ReactNode } from "react";
import "../../../core/styles/docs.scss";
import { source } from "#/core/mdx/sources/fumadocs_mdx/docs";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <DocsLayout
            tree={source.pageTree}
            {...baseOptions}
            containerProps={{
                className: "[&_#nd-sidebar>div[data-fdid]]:w-full",
            }}
            sidebar={{
                banner: (
                    <RootToggle
                        className="bg-background"
                        options={[
                            {
                                title: "User",
                                description: "User Documentation",
                                url: "/docs/user",
                                props: {
                                    className:
                                        "bg-popover hover:bg-muted/80 transition-colors duration-150",
                                },
                                icon: <UserIcon />,
                            },
                            {
                                title: "Developer",
                                description: "Developer Documentation",
                                url: "/docs/developer",
                                props: {
                                    className:
                                        "bg-popover hover:bg-muted/80 transition-colors duration-150",
                                },
                                icon: <TerminalIcon />,
                            },
                        ]}
                    />
                ),
            }}
        >
            {children}
        </DocsLayout>
    );
}
