import React, { type ReactNode } from "react";
import {
    getFormattedCitationAnchorId,
    getFormattedCitationFooterId,
} from "./get_formatted_id";
import { scrollToId } from "../../../utils/scroll_to_id";

interface InlineCitationProps {
    idx: number;
    /// The id of the citation, not the dom id.
    id: string;
}

export const InlineCitation = (props: InlineCitationProps): ReactNode => {
    return (
        <sup
            className="cursor-pointer"
            onClick={() => {
                scrollToId(getFormattedCitationFooterId(props.id));
            }}
            id={getFormattedCitationAnchorId(props.id, props.idx)}
        >
            {props.idx + 1}
        </sup>
    );
};

InlineCitation.displayName = "InlineCitation";
