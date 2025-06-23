export interface BibEntryDetailsProps {
    itemId: string;
}

export interface BibEntryDetails {
    id: string;
    title?: string | null;
}

declare global {
    interface WindowEventMap {
        "show-bib-entry-details": CustomEvent<BibEntryDetailsProps>;
    }
}
