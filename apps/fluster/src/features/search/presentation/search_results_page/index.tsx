import React, { type ReactNode } from "react";
import { MdxNoteSearchResultsList } from "../mdx_note_list";
import PanelContainer from "@/components/util/panel_container";

/* RESUME: Create a `SearchParams` and a `SearchResults` struct on the rust side and  */
const SearchResultsPage = (): ReactNode => {
  return (
    <PanelContainer>
      <MdxNoteSearchResultsList />
    </PanelContainer>
  );
};

SearchResultsPage.displayName = "SearchResultsPage";

export default SearchResultsPage;
