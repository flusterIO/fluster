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
        "database-sync-success": CustomEvent<object>;
        "refresh-mdx": CustomEvent<object>;
        "refresh-task-manager-timers": CustomEvent<object>;
        "refresh-kanban-board-list": CustomEvent<object>;
        "refresh-task-manager-timers": CustomEvent<object>;
    }
}
