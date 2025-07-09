import React, { type ReactNode } from "react";
import { MdxProvidersGroup } from "./mdx_provider_group";
import { MdxContent } from "./mdx_content";
import { MdxNoteGroup } from "@/lib/bindings";
import { MdxNoteBibliography } from "#/bibliography/presentation/note_bibliography";

interface MdxPageContentProps {
  mdx: string;
}

export const MdxPageContent = ({ mdx }: MdxPageContentProps): ReactNode => {
  return (
    <>
      <MdxProvidersGroup>
        <MdxContent mdx={mdx} />
      </MdxProvidersGroup>
      <MdxNoteBibliography citations={mdxGroup.citations} />
    </>
  );
};

MdxPageContent.displayName = "MdxPageContent";
