import {
    commands,
    PaginationProps,
    SemanticSearchResults,
} from "@/lib/bindings";
import React, { useEffect, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router";
import { MdxNoteSearchResult } from "../search_result_items/mdx_note";
import { SemanticSearchInputRow } from "./input_row";
import { SearchResultsQuantityCard } from "./quantity_card";
import { LoadingComponent } from "@/components/loading_screen";
import { AppRoutes } from "@fluster.io/dev";
import { PaginationPropsAsNumber } from "@/types/general";

import { AppState } from "@/state/initial_state";
import { connect } from "react-redux";

const connector = connect((state: AppState) => ({
    embeddingModel: state.ai.embeddingModel,
    defaultLanguageModel: state.ai.defaultLanguageModel,
    maxTextSplitTokens: state.ai.maxTextSplitTokens,
}));

interface CountData {
    mdx: number | string;
    tasks: number | string;
    bibEntries: number | string;
}

const getPagination = (sp: URLSearchParams): PaginationPropsAsNumber => {
    const _page = sp.get("page");
    const _per_page = sp.get("per_page");
    return {
        page_number: _page ? parseInt(_page) : 1,
        per_page: _per_page ? parseInt(_per_page) : 50,
    };
};

export const SemanticSearchResultsPage = connector(
    ({
        embeddingModel,
        maxTextSplitTokens,
        defaultLanguageModel,
    }: {
        embeddingModel: AppState["ai"]["embeddingModel"];
        defaultLanguageModel: AppState["ai"]["defaultLanguageModel"];
        maxTextSplitTokens: AppState["ai"]["maxTextSplitTokens"];
    }): ReactNode => {
        const [searchParams] = useSearchParams();
        const [data, setData] = useState<SemanticSearchResults | null>(null);
        const [count, setCount] = useState<CountData | null>();
        const query = searchParams.get("query");

        const getData = async (
            query: string,
            sp: URLSearchParams
        ): Promise<void> => {
            const pagination = getPagination(sp);
            const res = await commands.semanticSearch(
                query,
                {
                    embedding_model: embeddingModel,
                    language_model: defaultLanguageModel,
                    max_text_split_tokens: maxTextSplitTokens as unknown as string,
                    with_ai: false,
                },
                pagination as unknown as PaginationProps
            );
            if (res.status === "ok") {
                setData(res.data);
            } else {
                console.error("An error occured while gathering your data.", res.error);
                setData({
                    notes: [],
                });
                setCount({
                    mdx: 0,
                    bibEntries: 0,
                    tasks: 0,
                });
            }
            const bibCount = await commands.getBibEntryCount(null);
            const mdxCount = await commands.getNoteCount(null);
            const taskCount = await commands.getTaskCount("complete = False");
            setCount({
                mdx: mdxCount.status === "ok" ? mdxCount.data : 0,
                bibEntries: bibCount.status === "ok" ? bibCount.data : 0,
                tasks: taskCount.status === "ok" ? taskCount.data : 0,
            });
        };

        useEffect(() => {
            if (query) {
                getData(query, searchParams);
            } else {
                setData({
                    notes: [],
                });
            }
            /* eslint-disable-next-line  -- I hate this fucing rule. */
        }, [query, searchParams]);

        if (count === null || data === null) {
            return (
                <div className="w-full h-full flex flex-col justify-center items-center gap-4">
                    <LoadingComponent />
                </div>
            );
        }
        return (
            <div className="@container/search_results w-full flex flex-col justify-center items-center gap-6 my-16">
                <div className="w-full max-w-[1080px] space-y-6 px-8">
                    <SemanticSearchInputRow />
                    <div className="w-full grid grid-cols-1 @[768px]/search_results:grid-cols-3 gap-4">
                        <SearchResultsQuantityCard
                            label="Total Notes"
                            quantity={count?.mdx ?? 0}
                        />
                        <SearchResultsQuantityCard
                            label="Bibliography Entries"
                            quantity={count?.bibEntries ?? 0}
                            href={AppRoutes.bibliography}
                        />
                        <SearchResultsQuantityCard
                            label="Incomplete Tasks"
                            quantity={count?.tasks ?? 0}
                            href={AppRoutes.taskLists}
                        />
                    </div>
                    <div className="w-full flex flex-col justify-start items-center gap-4">
                        {data?.notes.map((n) => {
                            return <MdxNoteSearchResult key={n.mdx.file_path} item={n} />;
                        })}
                        {data.notes.length === 0 && (
                            <div className="flex flex-col justify-center items-center">
                                <div className="text-center text-xl">No notes found</div>
                                <div className="text-center text-foreground/80">
                                    {" "}
                                    Did you sync your notes{" "}
                                    <span className="italic font-bold">with</span> AI to generate
                                    vectors?
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
);

SemanticSearchResultsPage.displayName = "SemanticSearchResultsPage";
