import React, { type ReactNode } from "react";
import { useSearchResults } from "./use_search_results";
import { MdxNoteSearchResult } from "../search_result_items/mdx_note";

/* RESUME: Create a `SearchParams` and a `SearchResults` struct on the rust side and  */
const SearchResultsPage = (): ReactNode => {
    const results = useSearchResults();
    return (
        <div className="w-full h-full flex flex-col justify-start items-center gap-4 py-16">
            <div className="w-[min(768px,90%)] flex flex-col justify-start items-center">
                {results?.notes.map((n) => {
                    return (
                        <MdxNoteSearchResult key={`note-${n.mdx.file_path}`} item={n} />
                    );
                })}
            </div>
        </div>
    );
};

SearchResultsPage.displayName = "SearchResultsPage";

export default SearchResultsPage;
