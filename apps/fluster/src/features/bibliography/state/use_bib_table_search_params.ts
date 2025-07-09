import { useEffect } from "react";
import { useBibTableContext, useBibTableDispatch } from "./bib_table_context";
import { commands } from "@/lib/bindings";
import { parseBibEntry } from "../data/models/bib_entry_parsed";

/// A hook used to implement the search params for the bibliography page. This will not be useful for embedded tables.
export const useBibTableSearchParams = () => {
    const { predicate } = useBibTableContext();
    const dispatch = useBibTableDispatch();
    const getData = async (): Promise<void> => {
        const res = await commands.getBibEntries(null, {
            page_number: 1,
            per_page: Number.MAX_SAFE_INTEGER,
        });
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

    useEffect(() => {
        getData();
        /* eslint-disable-next-line  --  */
    }, [predicate]);
};
