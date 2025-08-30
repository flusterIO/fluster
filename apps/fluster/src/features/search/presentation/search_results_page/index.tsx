import React, { type ReactNode } from "react";
import { useSearchResults } from "./use_search_results";
import { MdxNoteSearchResult } from "../search_result_items/mdx_note";
import { H4 } from "@fluster.io/dev";
import { LoadingComponent } from "@/components/loading_screen";
import { TaskItemSearchResultsTable } from "#/task_manager/presentation/task_item_search_result_table";
import { EquationSearchResults } from "../search_result_items/equation_search_results";
import { SearchResultCategoryContainer } from "./search_result_category_container";
import { SnippetSearchResults } from "../search_result_items/snippet_search_results";

const SearchResultsPage = (): ReactNode => {
    const results = useSearchResults();
    console.log("results: ", results);
    if (results === null) {
        return (
            <div className="w-full h-full flex flex-col justify-center items-center">
                <LoadingComponent />
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col justify-start items-center gap-4 py-16">
            <div className="w-[min(768px,90%)]">
                {results.tasks.length > 0 ? (
                    <div className="w-full flex flex-col justify-start items-center">
                        <TaskItemSearchResultsTable tasks={results.tasks} />
                    </div>
                ) : null}
                <SearchResultCategoryContainer
                    byTagOnly
                    categoryId="equations"
                    title="Equations"
                >
                    {results?.equations.length ? (
                        <EquationSearchResults equations={results.equations} />
                    ) : (
                        <div className="w-full h-full flex flex-col justify-center items-center">
                            <H4 className="text-muted-foreground">No equations found</H4>
                        </div>
                    )}
                </SearchResultCategoryContainer>
                <SearchResultCategoryContainer
                    byTagOnly
                    categoryId="snippets"
                    title="Snippets"
                >
                    {results?.snippets.length ? (
                        <SnippetSearchResults snippets={results.snippets} />
                    ) : (
                        <div className="w-full h-full flex flex-col justify-center items-center">
                            <H4 className="text-muted-foreground">No snippets found</H4>
                        </div>
                    )}
                </SearchResultCategoryContainer>
                <SearchResultCategoryContainer categoryId="notes" title="Notes">
                    {results?.notes.length ? (
                        results.notes.map((n) => {
                            return (
                                <MdxNoteSearchResult key={`note-${n.mdx.file_path}`} item={n} />
                            );
                        })
                    ) : (
                        <div className="w-full h-full flex flex-col justify-center items-center">
                            <H4 className="text-muted-foreground">No notes found</H4>
                        </div>
                    )}
                </SearchResultCategoryContainer>
            </div>
        </div>
    );
};

SearchResultsPage.displayName = "SearchResultsPage";

export default SearchResultsPage;
