import { baseOptions } from "#/core/mdx/base_options";
import { docsSource } from "#/core/mdx/sources/docs_source";
import { RootToggle } from "fumadocs-ui/components/layout/root-toggle";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { TerminalIcon, UserIcon } from "lucide-react";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={docsSource.pageTree}
      {...baseOptions}
      containerProps={{
        className:
          "relative [&_#nd-sidebar]:md:sticky [&_#nd-sidebar]:top-0 [&_#nd-sidebar]:bg-background [&_#nd-sidebar_div[data-fdid]]:w-full bg-background text-foreground [&_#nd-toc]:min-w-[200px] [&_#nd-toc_a[data-active]]:text-foreground/80 hover:[&_#nd-toc_a[data-active]]:text-foreground",
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
