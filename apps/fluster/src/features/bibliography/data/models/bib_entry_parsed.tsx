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
    console.log("jsonData: ", jsonData.fields);
    return {
        model: item,
        title: jsonData.fields["title"][0]?.["v"]?.["Normal"] ?? bibFieldAbsentText,
        author:
            jsonData.fields["author"][0]?.["v"]?.["Normal"] ?? bibFieldAbsentText,
        journal:
            jsonData.fields["author"][0]?.["v"]?.["Normal"] ?? bibFieldAbsentText,
        year: jsonData.fields["year"][0]?.["v"]?.["Normal"] ?? bibFieldAbsentText,
        url: jsonData.fields?.["url"]?.[0]?.["v"]?.["Normal"] ?? bibFieldAbsentText,
    };
};
