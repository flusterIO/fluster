import { BundledTheme } from "shiki";
import { ShowCommandPaletteEventProps } from "./show_command_palette";

export interface BibEntryDetailsProps {
    itemId: string;
}
export interface BibEntryDetails {
    id: string;
    title?: string | null;
}

export interface ShowEquationDetailModalEventProps {
    /// The id of the equation, *not* the user provided id.
    id: string;
}

declare global {
    interface WindowEventMap {
        show_command_palette: CustomEvent<ShowCommandPaletteEventProps>;
        "show-bib-entry-details": CustomEvent<BibEntryDetailsProps>;
        "show-equation-detail-modal": CustomEvent<ShowEquationDetailModalEventProps>;
        "refresh-mdx": CustomEvent<object>;
    }
}
