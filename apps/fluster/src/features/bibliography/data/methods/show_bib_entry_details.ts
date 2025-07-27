import { BibEntryParsed } from "../models/bib_entry_parsed";

export const showBibEntryDetails = (entry: BibEntryParsed) => {
    window.dispatchEvent(
        new CustomEvent("show-bib-entry-details", {
            detail: {
                itemId: entry.model.id,
            },
        })
    );
};

export const showBibEntryDetailsById = (id: string) => {
    window.dispatchEvent(
        new CustomEvent("show-bib-entry-details", {
            detail: {
                itemId: id,
            },
        })
    );
};
