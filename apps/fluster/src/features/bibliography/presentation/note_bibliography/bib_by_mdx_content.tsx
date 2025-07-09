import { H4 } from "@fluster.io/dev";
import { commands, MdxNoteGroup } from "@/lib/bindings";
import { BibliographyCitation, cn } from "@fluster.io/dev";
import React, { useEffect, useState, type ReactNode } from "react";
import { BibEntryDetailSheet } from "../bib_entry_detail_pane";
import { BodyPortal } from "@/components/body_portal";

interface MdxNoteBibliographyByContentProps {
    mdx: string;
    noBibSheet?: boolean;
    classes?: {
        container?: string;
    };
}

export const MdxNoteBibliographyByContent = ({
    mdx,
    noBibSheet,
    classes = {},
}: MdxNoteBibliographyByContentProps): ReactNode => {
    const [citations, setCitations] = useState<MdxNoteGroup["citations"] | null>(
        null
    );
    const getCitations = async (_mdx: string): Promise<void> => {
        const res = await commands.parseMdxString(_mdx, null);
        console.log("res: ", res);
        if (res.status === "ok") {
            setCitations(res.data.citations);
        }
    };
    useEffect(() => {
        getCitations(mdx);
    }, [mdx]);

    useEffect(() => {
        console.log("citations: ", citations);
    }, [citations]);

    if (citations === null || citations.length === 0) {
        return null;
    }
    return (
        <>
            <div className={cn("w-full h-fit mt-12 relative", classes.container)}>
                <H4 className="mb-4">Citations</H4>
                {citations.map((c, i) => {
                    return <BibliographyCitation key={c.id} citation={c} idx={i} />;
                })}
            </div>
            {!noBibSheet && (
                <BodyPortal>
                    <BibEntryDetailSheet />
                </BodyPortal>
            )}
        </>
    );
};

MdxNoteBibliographyByContent.displayName = "MdxNoteBibliographyByContent";
