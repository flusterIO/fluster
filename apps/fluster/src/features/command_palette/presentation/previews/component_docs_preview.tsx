import { CommandPaletteAnyEntry } from "#/command_palette/data/models/command_palette_any_entry";
import { MdxContent } from "#/mdx/presentation/mdx_content";
import { MdxProviderGroup } from "#/mdx/presentation/mdx_provider_group";
import { commands } from "@/lib/bindings";
import React, { ReactNode, useEffect, useState } from "react";

export const ComponentDocsPreview = ({
    item,
}: {
    item: CommandPaletteAnyEntry;
}): ReactNode => {
    console.log("item.: ", item);
    const [mdxContent, setMdxContent] = useState<null | string>(null);
    const getData = async (fsPath: string): Promise<void> => {
        const res = await commands.getEmbeddedDocByRelativePath(fsPath);
        if (res.status === "ok") {
            setMdxContent(res.data);
        } else {
            console.error("Could not get mdx content.");
        }
    };
    useEffect(() => {
        if ("previewPath" in item) {
            getData(item.previewPath as string);
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
