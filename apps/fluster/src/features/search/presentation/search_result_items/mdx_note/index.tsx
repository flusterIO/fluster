import { MdxNoteGroup } from "@/lib/bindings";
import React, { HTMLProps, type ReactNode } from "react";

interface MdxNoteSearchResultProps extends HTMLProps<HTMLDivElement> {
    item: MdxNoteGroup;
}

export const MdxNoteSearchResult = ({
    item,
}: MdxNoteSearchResultProps): ReactNode => {
    return (
        <div className="w-full flex flex-col justify-center items-center gap-4 px-4 py-3">
            <div className="text-lg font-semibold">{item.front_matter.title}</div>
        </div>
    );
};

MdxNoteSearchResult.displayName = "MdxNoteSearchResult";
