import React, { type ReactNode } from "react";
import { useSearchResults } from "./use_search_results";
import { MdxNoteSearchResult } from "../search_result_items/mdx_note";
import { H3 } from "@fluster.io/dev";
import { LoadingComponent } from "@/components/loading_screen";

const SearchResultsPage = (): ReactNode => {
  const results = useSearchResults();
  if (results === null) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <LoadingComponent />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-start items-center gap-4 py-16">
      <div className="w-[min(768px,90%)] flex flex-col justify-start items-center">
        {results?.notes.length ? (
          results.notes.map((n) => {
            return (
              <MdxNoteSearchResult key={`note-${n.mdx.file_path}`} item={n} />
            );
          })
        ) : (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <H3>No notes found</H3>
          </div>
        )}
      </div>
    </div>
  );
};

SearchResultsPage.displayName = "SearchResultsPage";

export default SearchResultsPage;
