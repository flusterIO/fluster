"use client";
import { PaginationProps } from "@/lib/bindings";
import { ReactNode, createContext, useContext } from "react";
import { BibEntryParsed } from "../data/models/bib_entry_parsed";
import { BibTableColumnId } from "../presentation/bib_table/columns";

export interface BibTableState {
  pagination: PaginationProps;
  /// An optional predicate passed to the database.
  predicate?: string;
  entries: BibEntryParsed[];
  /// The number of rows in the table for a given predicate.
  count: number;
  columnVisibility: Record<BibTableColumnId, boolean>;
}

export const defaultInitialBibTableState: BibTableState = {
  pagination: {
    page_number: 1,
    per_page: 10,
  },
  entries: [],
  count: 0,
  predicate: undefined,
  columnVisibility: {
    [BibTableColumnId.select]: true,
    [BibTableColumnId.title]: true,
    [BibTableColumnId.author]: true,
    [BibTableColumnId.journal]: true,
    [BibTableColumnId.year]: true,
  },
};

export const BibTableContext = createContext<BibTableState>(
  defaultInitialBibTableState
);

type BibTableContextActions =
  | {
      type: "setEntries";
      payload: BibEntryParsed[];
    }
  | {
      type: "incrementPage";
      payload: null;
    }
  | {
      type: "decrementPage";
      payload: null;
    }
  | {
      type: "setItemCount";
      payload: number;
    }
  | {
      type: "setColumnVisibility";
      payload: BibTableState["columnVisibility"];
    };

export const BibTableDispatchContext = createContext<
  React.Dispatch<BibTableContextActions>
>(null!);

export const useBibTableContext = () => useContext(BibTableContext);
export const useBibTableDispatch = () => useContext(BibTableDispatchContext);

export const BibTableContextReducer = (
  state: BibTableState,
  action: BibTableContextActions
): BibTableState => {
  switch (action.type) {
    case "setEntries": {
      return {
        ...state,
        entries: action.payload,
      };
    }
    case "incrementPage":
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page_number: state.pagination.page_number + 1,
        },
      };
    case "decrementPage":
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page_number: state.pagination.page_number - 1,
        },
      };
    case "setItemCount":
      return {
        ...state,
        count: action.payload,
      };
    case "setColumnVisibility":
      return {
        ...state,
        columnVisibility: action.payload,
      };
    default: {
      return state;
    }
  }
};

BibTableContextReducer.displayName = "BibTableContextReducer";

export interface BibTableProviderProps {
  children: ReactNode;
  initialValues?: Partial<BibTableState>;
}
