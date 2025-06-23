"use client";
import { createContext, useContext } from "react";
import { PdfLoadingState } from "../types";

export enum PdfView {
  singlePage = "singlePage",
  grid = "grid",
  withToc = "withToc",
}

export interface PdfState {
  fsPath: string | null;
  numPages: number;
  pageNumber: number;
  loading: PdfLoadingState;
  view: PdfView;
}

export const initialPdfState: PdfState = {
  fsPath: null,
  numPages: 1,
  pageNumber: 1,
  loading: PdfLoadingState.initial,
  view: PdfView.singlePage,
};

export const PdfContext = createContext<PdfState>(initialPdfState);

type PdfContextActions =
  | {
      type: "setNumPages";
      payload: number;
    }
  | {
      type: "incrementPageNumber";
      payload?: null;
    }
  | {
      type: "decrementPageNumber";
      payload?: null;
    }
  | {
      type: "setPdfView";
      payload: PdfView;
    }
  | {
      type: "setPageNumber";
      payload: number;
    }
  | {
      type: "setPageNumberAndNavigate";
      payload: number;
    };

export const PdfDispatchContext = createContext<
  React.Dispatch<PdfContextActions>
>(null!);

export const usePdfContext = () => useContext(PdfContext);
export const usePdfDispatch = () => useContext(PdfDispatchContext);

export const PdfContextReducer = (
  state: PdfState,
  action: PdfContextActions
): PdfState => {
  switch (action.type) {
    case "incrementPageNumber": {
      return {
        ...state,
        pageNumber: Math.min(state.pageNumber + 1, state.numPages),
      };
    }
    case "decrementPageNumber": {
      return {
        ...state,
        pageNumber: Math.max(state.pageNumber - 1, 0),
      };
    }
    case "setNumPages": {
      return {
        ...state,
        pageNumber: Math.min(state.pageNumber, action.payload),
        numPages: action.payload,
      };
    }
    case "setPageNumber": {
      return {
        ...state,
        pageNumber: action.payload,
      };
    }
    case "setPdfView": {
      return {
        ...state,
        view: action.payload,
      };
    }
    case "setPageNumberAndNavigate": {
      return {
        ...state,
        pageNumber: action.payload,
        view: PdfView.singlePage,
      };
    }
    default: {
      return state;
    }
  }
};

PdfContextReducer.displayName = "PdfContextReducer";
