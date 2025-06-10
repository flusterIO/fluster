import { useEffect } from "react";
import { useBibTableContext, useBibTableDispatch } from "./bib_table_context";
import { commands, PaginationProps } from "@/lib/bindings";
import { parseBibEntry } from "../data/models/bib_entry_parsed";

/// A hook used to implement the search params for the bibliography page. This will not be useful for embedded tables.
export const useBibTableSearchParams = () => {
  const { pagination, predicate } = useBibTableContext();
  const dispatch = useBibTableDispatch();
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
    /// RESUME: Create the getCount commnad on the rust side in the morning.
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
    getCount(predicate);
    /* eslint-disable-next-line  --  */
  }, [predicate]);
  useEffect(() => {
    getData(pagination);
    /* eslint-disable-next-line  --  */
  }, [pagination]);
};
