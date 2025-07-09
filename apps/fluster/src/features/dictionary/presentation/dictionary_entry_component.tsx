import React, { useEffect, useState, type ReactNode } from "react";
import { DictionaryEntryWithIdx } from "../types";
import { H3 } from "@fluster.io/dev";
import { InlineMdxContent } from "#/mdx/presentation/inline_mdx_content";
import { NavLink } from "react-router";
import { AppRoutes } from "@fluster.io/dev";
import { commands } from "@/lib/bindings";

interface DictionaryEntryComponentProps {
    item: DictionaryEntryWithIdx;
}

const DictionaryEntryComponent = ({
    item,
}: DictionaryEntryComponentProps): ReactNode => {
    const [url, setUrl] = useState<string | null>(null);
    const getUrl = async (label: string): Promise<void> => {
        const res = await commands.getNoteByDictEntryLabel(label);
        if (res.status === "ok") {
            const sp = new URLSearchParams();
            sp.set("fsPath", res.data.notes[0].mdx.file_path);
            setUrl(`${AppRoutes.viewMdxNote}?${sp.toString()}`);
        } else {
            console.error("Error: ", res.error);
        }
    };

    useEffect(() => {
        getUrl(item.label);
    }, [item]);

    if (!url) {
        return null;
    }
    return (
        <div className="w-full flex flex-col justify-start items-start gap-4 mb-6">
            <H3 className="w-full font-bold [&_p]:text-xl">
                <NavLink to={url}>
                    <InlineMdxContent mdx={item.label} />
                </NavLink>
            </H3>
            <div className="ml-6 w-full">
                <InlineMdxContent mdx={item.body} />
            </div>
        </div>
    );
};

DictionaryEntryComponent.displayName = "DictionaryEntryComponent";

export default DictionaryEntryComponent;
