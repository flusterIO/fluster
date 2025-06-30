import React, { type ReactNode } from "react";
import { MdxNoteGroup } from "../../../lib/bindings";
import {
    getFormattedCitationAnchorId,
    getFormattedCitationFooterId,
} from "../../auto_inserted/inline_citation/get_formatted_id";
import { scrollToId } from "../../../utils/scroll_to_id";

interface BibliographyCitationProps {
    citation: MdxNoteGroup["citations"][number];
    idx: number;
}

export const BibliographyCitation = ({
    citation,
    idx,
}: BibliographyCitationProps): ReactNode => {
    const openModal = (): void => {
        console.log(`Opening modal`);
        window.dispatchEvent(
            new CustomEvent("show-bib-entry-details", {
                detail: {
                    itemId: citation.id,
                },
            })
        );
    };
    return (
        <div className="w-full">
            <span
                id={getFormattedCitationFooterId(citation.id)}
                onClick={() => {
                    scrollToId(getFormattedCitationAnchorId(citation.id, 0));
                }}
                className="inline float-left mr-4"
            >
                {`${idx + 1}.`}
            </span>
            <span
                onClick={openModal}
                className="inline cursor-pointer"
                dangerouslySetInnerHTML={{ __html: citation.html_citation }}
            />
        </div>
    );
};

BibliographyCitation.displayName = "BibliographyCitation";
