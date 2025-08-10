import React, { type ReactNode } from "react";
import { CodeBlock, CodeBlockProps } from "../../code/code_block";
import { Badge } from "../../shad/badge";
import { WithInlineMdx } from "../../../embeddable_components/types";

interface SnippetModalProps
  extends WithInlineMdx,
    Pick<CodeBlockProps, "themes" | "darkMode"> {
  data: {
    label: string;
    body: string;
    desc: string | null;
    lang: string;
    ctime: string | null;
    utime: string | null;
    tags: string[];
  };
}

export const SnippetModal = ({
  data,
  themes,
  darkMode,
  InlineMdxContent,
}: SnippetModalProps): ReactNode => {
  return (
    <div className="grid grid-cols-1 @[640px]/snippet_preview:grid-cols-[1fr_2fr] gap-x-4 gap-y-2 w-fit max-w-full border rounded bg-card text-card-foreground px-4 py-3 min-w-[min(90%,350px)]">
      <div className="flex flex-col justify-start items-start w-full h-full min-w-[200px] mb-4 @[640px]/snippet_preview:mb-0 ">
        <div className="text-xl font-bold tracking-tight w-full">
          <InlineMdxContent mdx={data.label} />
        </div>
        {data.desc?.length ? (
          <div className="text-foreground/80 w-full">{data.desc}</div>
        ) : null}
      </div>
      <div className="w-full h-full flex flex-col justify-start items-center overflow-y-auto overflow-x-auto">
        <CodeBlock
          lang={data.lang}
          code={data.body}
          themes={themes}
          darkMode={darkMode}
          className="max-h-[400px]"
        />
        {
          <div className="w-full flex flex-row justify-start items-center gap-x-4 gap-y-2 flex-wrap mt-4">
            {data.tags.map((t) => {
              return <Badge>{t}</Badge>;
            })}
          </div>
        }
      </div>
    </div>
  );
};

SnippetModal.displayName = "SnippetModal";
