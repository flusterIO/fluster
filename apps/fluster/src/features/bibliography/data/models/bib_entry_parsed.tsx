import { BibEntryModel } from "@/lib/bindings";

export interface BibEntryParsed {
    model: BibEntryModel;
    title: string;
    author: string;
    journal: string;
    year: string;
    url: string;
}

export const bibFieldAbsentText = "--";

export const parseBibEntry = (item: BibEntryModel): BibEntryParsed => {
    const jsonData = JSON.parse(item.data);
    return {
        model: item,
        title: jsonData["title"] ?? bibFieldAbsentText,
        author: jsonData["author"] ?? bibFieldAbsentText,
        journal: jsonData["author"] ?? bibFieldAbsentText,
        year: jsonData["year"] ?? bibFieldAbsentText,
        url: jsonData["url"] ?? bibFieldAbsentText,
    };
};
