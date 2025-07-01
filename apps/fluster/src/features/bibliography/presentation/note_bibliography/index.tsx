import { H4 } from "@/components/typography/typography";
import { MdxNoteGroup } from "@/lib/bindings";
import { BibliographyCitation } from "@fluster.io/dev";
import React, { type ReactNode } from "react";
import { BibEntryDetailSheet } from "../bib_entry_detail_pane";
import { BodyPortal } from "@/components/body_portal";

interface MdxNoteBibliographyProps {
    citations: MdxNoteGroup["citations"];
}

export const MdxNoteBibliography = ({
    citations,
}: MdxNoteBibliographyProps): ReactNode => {
    if (citations.length === 0) {
        return null;
    }
    return (
        <>
            <div className="w-full h-fit mt-12">
                <H4 className="mb-4">Citations</H4>
                {citations.map((c, i) => {
                    return <BibliographyCitation key={c.id} citation={c} idx={i} />;
                })}
            </div>
            <BodyPortal>
                <BibEntryDetailSheet />
            </BodyPortal>
        </>
    );
};

MdxNoteBibliography.displayName = "MdxNoteBibliography";
