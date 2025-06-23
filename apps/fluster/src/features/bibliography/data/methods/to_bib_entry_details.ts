import { BibEntryDetails } from "#/bibliography/types";
import { BibEntryModel } from "@/lib/bindings";

export const toBibEntryDetails = (entry: BibEntryModel): BibEntryDetails => {
  const data = JSON.parse(entry.data);
  return {
    id: entry.id,
    title: data["title"],
  };
};
