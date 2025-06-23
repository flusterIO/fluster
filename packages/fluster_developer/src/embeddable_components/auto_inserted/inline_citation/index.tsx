import React, { type ReactNode } from "react";
import { getFormattedCitationAnchorId } from "./get_formatted_id";

interface InlineCitationProps {
    idx: number;
    /// The id of the citation, not the dom id.
    id: string;
}

export const InlineCitation = (props: InlineCitationProps): ReactNode => {
    return <sup id={getFormattedCitationAnchorId(props.id)}>{props.idx + 1}</sup>;
};

InlineCitation.displayName = "InlineCitation";
