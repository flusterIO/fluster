import { BibEntryDetails } from "@/events/window_events";
import { BibEntryModel } from "@/lib/bindings";

export const toBibEntryDetails = (entry: BibEntryModel): BibEntryDetails => {
    const data = JSON.parse(entry.data);
    return {
        id: entry.id,
        title: data["title"],
    };
};
