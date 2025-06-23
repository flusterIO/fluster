import "#/pdf/data/utils/init_pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { commands } from "@/lib/bindings";
import { LoadingComponent } from "@/components/loading_screen";
import type { Source } from "react-pdf/dist/esm/shared/types.js";
import { PdfSinglePageView } from "./pdf_views/single_page";
import { PdfSinglePageViewWithToc } from "./pdf_views/with_toc";
import { PdfGridView } from "./pdf_views/grid";
<<<<<<< HEAD
import {
  PdfView,
  usePdfContext,
  usePdfDispatch,
} from "#/pdf/state/provider/pdf_context";
import { useSearchParams } from "react-router";
import { Document } from "react-pdf";
import { pdfOptions } from "#/pdf/data/utils/init_pdf";
import { cn } from "@fluster.io/dev";
||||||| f36a7f4
import { PdfView, usePdfContext } from "#/pdf/state/provider/pdf_context";
=======
import {
    PdfView,
    usePdfContext,
    usePdfDispatch,
} from "#/pdf/state/provider/pdf_context";
import { Document } from "react-pdf";
import { pdfOptions } from "#/pdf/data/utils/init_pdf";
import { cn } from "@fluster.io/dev";
import { useSearchParams } from "react-router";
>>>>>>> feat/pdf

interface PdfContainerProps {
    fsPath: string;
}

interface PdfLoadedEventProps {
    // The file system path of the pdf. Used for comparison and state updates.
    fsPath: string;
}

declare global {
    interface WindowEventMap {
        "pdf-loaded": CustomEvent<PdfLoadedEventProps>;
    }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface WindowEventMap {
    "pdf-loaded": CustomEvent<object>;
  }
}

export const PdfContainer = ({ fsPath }: PdfContainerProps): ReactNode => {
<<<<<<< HEAD
  const [data, setData] = useState<Source | null>(null);
  const { view } = usePdfContext();
  const dispatch = usePdfDispatch();
  const [searchParams] = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null!);
  const getData = async (_fsPath: string): Promise<void> => {
    const res = await commands.readFileToBytes(_fsPath);
    if (res.status === "ok") {
      setData({
        data: res.data,
      });
    } else {
      console.error(
        "An error occurred while attempting to gather pdf file data: ",
        res.error
      );
    }
  };
||||||| f36a7f4
  const [data, setData] = useState<Source | null>(null);
  const { view } = usePdfContext();
  const containerRef = useRef<HTMLDivElement>(null!);
  const getData = async (_fsPath: string): Promise<void> => {
    const res = await commands.readFileToBytes(_fsPath);
    if (res.status === "ok") {
      setData({
        data: res.data,
      });
    } else {
      console.error(
        "An error occurred while attempting to gather pdf file data: ",
        res.error
      );
    }
  };
=======
    const [data, setData] = useState<Source | null>(null);
    const { view } = usePdfContext();
    const viewRef = useRef(view);
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = usePdfDispatch();
    const containerRef = useRef<HTMLDivElement>(null!);
    const getData = async (_fsPath: string): Promise<void> => {
        const res = await commands.readFileToBytes(_fsPath);
        if (res.status === "ok") {
            setData({
                data: res.data,
            });
        } else {
            console.error(
                "An error occurred while attempting to gather pdf file data: ",
                res.error
            );
        }
    };
    useEffect(() => {
        viewRef.current = view;
        const viewSp = searchParams.get("pdfView");
        if (viewSp && view && viewSp !== view) {
            searchParams.set("pdfView", view);
            setSearchParams(viewSp);
        }
        /* eslint-disable-next-line  --  */
    }, [view]);
>>>>>>> feat/pdf

<<<<<<< HEAD
  const viewParam = searchParams.get("pdfView");

  useEffect(() => {
    if (viewParam) {
      dispatch({
        type: "setPdfView",
        payload: viewParam as PdfView,
      });
    }
  }, [viewParam]);

  useEffect(() => {
    getData(fsPath);
  }, [fsPath]);
||||||| f36a7f4
  useEffect(() => {
    getData(fsPath);
  }, [fsPath]);
=======
    useEffect(() => {
        getData(fsPath);
    }, [fsPath]);
>>>>>>> feat/pdf

<<<<<<< HEAD
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    dispatch({
      type: "setNumPages",
      payload: numPages,
    });
    window.dispatchEvent(new CustomEvent("pdf-loaded"));
  };

  return (
    <div
      ref={containerRef}
      className="@container/pdf w-full h-full min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center"
    >
      <Document
        file={data}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={(e) => console.error("Pdf Loading Error: ", e)}
        onError={(e) => console.warn("Pdf Error: ", e)}
        options={pdfOptions}
        loading={<LoadingComponent />}
        className={cn(
          "max-w-[min(768px,90%)] max-h-screen",
          view === PdfView.withToc && "flex flex-row"
        )}
      >
        {data === null && (
          <div>
            <LoadingComponent />
          </div>
        )}
        {data !== null && view === PdfView.singlePage && (
          <PdfSinglePageView containerRef={containerRef} />
        )}
        {data !== null && view === PdfView.withToc && (
          <PdfSinglePageViewWithToc containerRef={containerRef} />
        )}
        {data !== null && view === PdfView.grid && <PdfGridView />}
      </Document>
    </div>
  );
||||||| f36a7f4
  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center"
    >
      {data === null && (
        <div>
          <LoadingComponent />
        </div>
      )}
      {data !== null && view === PdfView.singlePage && (
        <PdfSinglePageView data={data} />
      )}
      {data !== null && view === PdfView.withToc && (
        <PdfSinglePageViewWithToc containerRef={containerRef} data={data} />
      )}
      {data !== null && view === PdfView.grid && <PdfGridView data={data} />}
    </div>
  );
=======
    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
        dispatch({
            type: "setNumPages",
            payload: numPages,
        });
    };

    return (
        <div
            ref={containerRef}
            className="pdf-container w-full max-w-full h-full min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center overflow-x-hidden [&_.react-pdf__Document]:max-w-full ppt-16 [&_.react-pdf__Page__canvas]:max-w-full [&_.react-pdf__Page__canvas]:h-auto"
        >
            <Document
                file={data}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={(e) => console.error("Pdf Loading Error: ", e)}
                onError={(e) => console.warn("Pdf Error: ", e)}
                options={pdfOptions}
                loading={<LoadingComponent />}
                className={cn(
                    "max-w-[min(768px,90%)] max-h-screen",
                    view === PdfView.withToc && "flex flex-row"
                )}
            >
                {data === null && (
                    <div className="w-full h-full flex flex-col justify-center items-center">
                        <LoadingComponent />
                    </div>
                )}
                {data !== null && view === PdfView.singlePage && <PdfSinglePageView />}
                {data !== null && view === PdfView.withToc && (
                    <PdfSinglePageViewWithToc containerRef={containerRef} />
                )}
                {data !== null && view === PdfView.grid && <PdfGridView />}
            </Document>
        </div>
    );
>>>>>>> feat/pdf
};

PdfContainer.displayName = "PdfContainer";
