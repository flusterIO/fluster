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

interface CountData {
  mdx: number | string;
  tasks: number | string;
  bibEntries: number | string;
}

const getPagination = (sp: URLSearchParams): PaginationProps => {
  const _page = sp.get("page");
  const _per_page = sp.get("per_page");
  return {
    page_number: (_page ? parseInt(_page) : 1) as unknown as string,
    per_page: (_per_page ? parseInt(_per_page) : 50) as unknown as string,
  };
};

export const SemanticSearchResultsPage = (): ReactNode => {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<SemanticSearchResults | null>(null);
  const [count, setCount] = useState<CountData | null>();
  const query = searchParams.get("query");

  const getData = async (query: string, sp: URLSearchParams): Promise<void> => {
    const pagination = getPagination(sp);
    const res = await commands.semanticSearch(query, pagination);
    if (res.status === "ok") {
      setData(res.data);
    } else {
      console.error("An error occured while gathering your data.", res.error);
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
        </div>
      </div>
    </div>
  );
};

SemanticSearchResultsPage.displayName = "SemanticSearchResultsPage";
