import { useEffect, useRef } from "react";
import { useBibTableContext, useBibTableDispatch } from "./bib_table_context";
import { commands, PaginationProps } from "@/lib/bindings";
import { parseBibEntry } from "../data/models/bib_entry_parsed";
import { useEventListener } from "@fluster.io/dev";

declare global {
    interface WindowEventMap {
        "request-bib-table-refresh": CustomEvent<{
            query?: string;
        }>;
    }
}

/// A hook used to implement the search params for the bibliography page. This will not be useful for embedded tables.
export const useBibTableSearchParams = () => {
    const { pagination, predicate } = useBibTableContext();
    const timer = useRef<NodeJS.Timeout | null>(null);
    const paginationRef = useRef<typeof pagination>(pagination);
    const dispatch = useBibTableDispatch();
    const fullTextSearch = async (
        query: string,
        _pagination: PaginationProps
    ): Promise<void> => {
        const res = await commands.bibEntriesFullTextSearch(query, _pagination);
        if (res.status === "ok") {
            dispatch({
                type: "setEntries",
                payload: res.data.map((entry) => parseBibEntry(entry)),
            });
        } else {
            console.error(
                `An error occurred while parsing bib entries. If this error continues, please file an issue on Github: `,
                res.error
            );
        }
    };
    const getData = async (_pagination: PaginationProps): Promise<void> => {
        const res = await commands.getBibEntries(null, _pagination);
        if (res.status === "ok") {
            dispatch({
                type: "setEntries",
                payload: res.data.map((entry) => parseBibEntry(entry)),
            });
        } else {
            console.error(
                `An error occurred while parsing bib entries. If this error continues, please file an issue on Github`
            );
        }
    };

    const getCount = async (_predicate?: string): Promise<void> => {
        const res = await commands.getBibEntryCount(_predicate ?? null);
        if (res.status === "ok") {
            dispatch({
                type: "setItemCount",
                payload: parseInt(res.data),
            });
        } else {
            console.error(
                "An error occurred while getting the bibliography entry count."
            );
        }
    };
    useEffect(() => {
        paginationRef.current = pagination;
        getCount(predicate);
        getData(pagination);
        /* eslint-disable-next-line  --  */
    }, [predicate, pagination]);

    useEventListener("request-bib-table-refresh", (e) => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        if (e.detail.query?.trim().length) {
            const _timer = setTimeout(() => {
                fullTextSearch(e.detail.query!, paginationRef.current);
            }, 500);
            timer.current = _timer;
        } else {
            getData(paginationRef.current);
            getCount();
        }
    });
};
