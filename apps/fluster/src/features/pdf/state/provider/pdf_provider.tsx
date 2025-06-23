import React, { ReactNode, useReducer } from "react";
import {
  initialPdfState,
  PdfContext,
  PdfContextReducer,
  PdfDispatchContext,
  PdfState,
  PdfView,
} from "./pdf_context";
import { AppRoutes, useEventListener } from "@fluster.io/dev";
import { useMatch } from "react-router";

interface PdfProviderProps {
  children: ReactNode;
  initialValues?: Partial<PdfState>;
}

interface SetPdfViewEventProps {
  /// The id field of the pdf context.
  view: PdfView;
}
declare global {
  interface WindowEventMap {
    "set-pdf-page-view": CustomEvent<SetPdfViewEventProps>;
  }
}

export const PdfProvider = ({ children, initialValues }: PdfProviderProps) => {
  const [state, dispatch] = useReducer(
    PdfContextReducer,
    initialValues ? { ...initialValues, ...initialPdfState } : initialPdfState
  );

  const isPdfPage = useMatch(AppRoutes.pdf);

  useEventListener("set-pdf-page-view", (e) => {
    if (isPdfPage) {
      dispatch({
        type: "setPdfView",
        payload: e.detail.view,
      });
    }
  });

  return (
    <PdfContext.Provider value={state}>
      <PdfDispatchContext.Provider value={dispatch}>
        {children}
      </PdfDispatchContext.Provider>
    </PdfContext.Provider>
  );
};
