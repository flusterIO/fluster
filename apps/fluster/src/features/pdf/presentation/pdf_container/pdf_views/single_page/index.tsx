import {
<<<<<<< HEAD
  usePdfContext,
  usePdfDispatch,
||||||| f36a7f4
  PdfView,
  usePdfContext,
  usePdfDispatch,
=======
    usePdfContext,
    usePdfDispatch,
>>>>>>> feat/pdf
} from "#/pdf/state/provider/pdf_context";
import { Button } from "@fluster.io/dev";
import { ChevronLeft, ChevronRight } from "lucide-react";
<<<<<<< HEAD
import React, { RefObject, useEffect, useState, type ReactNode } from "react";
import { Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
||||||| f36a7f4
import React, { ComponentProps, RefObject, type ReactNode } from "react";
import { Document, Page } from "react-pdf";
import { Source } from "react-pdf/dist/esm/shared/types.js";
=======
import React, { type ReactNode } from "react";
import { Page } from "react-pdf";
>>>>>>> feat/pdf

export const PdfSinglePageView = ({
<<<<<<< HEAD
  containerRef,
||||||| f36a7f4
  data,
  children,
=======
    onLoad,
    width,
>>>>>>> feat/pdf
}: {
<<<<<<< HEAD
  containerRef: RefObject<HTMLDivElement>;
||||||| f36a7f4
  data: Source;
  children?: ReactNode;
=======
    onLoad?: () => void;
    width?: number;
>>>>>>> feat/pdf
}): ReactNode => {
    const state = usePdfContext();
    const dispatch = usePdfDispatch();

<<<<<<< HEAD
  const [width, setWidth] = useState(0);

  const onContainerResize = (): void => {
    let w = containerRef.current?.getBoundingClientRect().width;
    if (w) {
      setWidth(Math.min(768, 0.9 * w));
    }
  };

  useEffect(() => {
    containerRef.current?.addEventListener("resize", onContainerResize);
    return () =>
      containerRef.current?.removeEventListener("resize", onContainerResize);
  }, []);

  return (
    <div className="w-fit flex flex-col justify-center items-center gap-4">
      <Page width={width} pageNumber={state.pageNumber} />
      <div className="flex flex-row justify-center items-center gap-4">
        <Button
          size="icon"
          disabled={state.pageNumber <= 1}
          onClick={() => {
            dispatch({
              type: "decrementPageNumber",
            });
          }}
        >
          <ChevronLeft />
        </Button>
        <Button
          disabled={state.pageNumber >= state.numPages}
          size="icon"
          onClick={() => {
            dispatch({
              type: "incrementPageNumber",
            });
          }}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
||||||| f36a7f4
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    dispatch({
      type: "setNumPages",
      payload: numPages,
    });
  };

  return (
    <>
      <Document
        file={data}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={(e) => console.error("Pdf Loading Error: ", e)}
        onError={(e) => console.warn("Pdf Error: ", e)}
        options={pdfOptions}
        loading={<LoadingComponent />}
        className={cn(
          "max-w-[min(768px,90%)] max-h-screen",
          state.view === PdfView.withToc && "flex flex-row"
        )}
      >
        {children}
        <div className="w-fit flex flex-col justify-center items-center gap-4">
          <Page pageNumber={state.pageNumber} />
          <div className="flex flex-row justify-center items-center gap-4">
            <Button
              size="icon"
              disabled={state.pageNumber <= 1}
              onClick={() => {
                dispatch({
                  type: "decrementPageNumber",
                });
              }}
            >
              <ChevronLeft />
            </Button>
            <Button
              disabled={state.pageNumber >= state.numPages}
              size="icon"
              onClick={() => {
                dispatch({
                  type: "incrementPageNumber",
                });
              }}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </Document>
    </>
  );
=======
    return (
        <div className="max-w-full h-fit flex flex-col justify-center items-center gap-4">
            <Page
                width={width}
                pageNumber={state.pageNumber}
                onLoadSuccess={onLoad}
            />
            <div className="flex flex-row justify-center items-center gap-4">
                <Button
                    size="icon"
                    disabled={state.pageNumber <= 1}
                    onClick={() => {
                        dispatch({
                            type: "decrementPageNumber",
                        });
                    }}
                >
                    <ChevronLeft />
                </Button>
                <Button
                    disabled={state.pageNumber >= state.numPages}
                    size="icon"
                    onClick={() => {
                        dispatch({
                            type: "incrementPageNumber",
                        });
                    }}
                >
                    <ChevronRight />
                </Button>
            </div>
        </div>
    );
>>>>>>> feat/pdf
};

PdfSinglePageView.displayName = "PdfSinglePageView";
