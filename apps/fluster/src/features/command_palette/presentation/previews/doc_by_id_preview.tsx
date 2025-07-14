import { CommandPaletteAnyEntry } from "#/command_palette/data/models/command_palette_any_entry";
import { MdxContent } from "#/mdx/presentation/mdx_content";
import { MdxProviderGroup } from "#/mdx/presentation/mdx_provider_group";
import { commands, InternalEmbeddedDocsId } from "@/lib/bindings";
import React, { ReactNode, useEffect, useState } from "react";

export const DocsByIdPreview = ({
    item,
}: {
    item: CommandPaletteAnyEntry;
}): ReactNode => {
    const [mdxContent, setMdxContent] = useState<null | string>(null);
    const getData = async (docId: InternalEmbeddedDocsId): Promise<void> => {
        const res = await commands.getEmbeddedDoc(docId);
        setMdxContent(res);
    };
    useEffect(() => {
        if (!item) {
            return;
        }
        if ("docId" in item) {
            getData(item.docId as InternalEmbeddedDocsId);
        }
    }, [item]);
    if (!mdxContent) {
        return null;
    }
    return (
        <div className="overflow-y-auto max-h-[70vh]">
            <MdxProviderGroup>
                <MdxContent removeGrayMatter className="mdx-small" mdx={mdxContent} />
            </MdxProviderGroup>
        </div>
    );
};
