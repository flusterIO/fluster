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
import {
    PdfView,
    usePdfContext,
    usePdfDispatch,
} from "#/pdf/state/provider/pdf_context";
import { Document } from "react-pdf";
import { pdfOptions } from "#/pdf/data/utils/init_pdf";
import { cn } from "@fluster.io/dev";
import { useSearchParams } from "react-router";

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

export const PdfContainer = ({ fsPath }: PdfContainerProps): ReactNode => {
    const [data, setData] = useState<Source | null>(null);
    const { view } = usePdfContext();
    /* const viewRef = useRef(view); */
    const [searchParams] = useSearchParams();
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
    /* useEffect(() => { */
    /*     viewRef.current = view; */
    /*     const viewSp = searchParams.get("pdfView"); */
    /*     if (viewSp && view && viewSp !== view) { */
    /*         console.log("settingSearchParams: "); */
    /*         searchParams.set("pdfView", view); */
    /*     } */
    /* }, [view]); */

    const viewParam = searchParams.get("pdfView");

    useEffect(() => {
        if (viewParam) {
            dispatch({
                type: "setPdfView",
                payload: viewParam as PdfView,
            });
        }
        /* eslint-disable-next-line  --  */
    }, [viewParam]);

    useEffect(() => {
        getData(fsPath);
    }, [fsPath]);
    useEffect(() => {
        getData(fsPath);
    }, [fsPath]);
    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
        dispatch({
            type: "setNumPages",
            payload: numPages,
        });
    };

    if (data === null) {
        return (
            <div className="w-full h-full flex flex-col justify-center items-center">
                <LoadingComponent />
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className={cn(
                "@container/pdf w-full max-w-full h-full min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center overflow-x-hidden [&_.react-pdf__Document]:max-w-full [&_.react-pdf__Page__canvas]:max-w-full [&_.react-pdf__Page__canvas]:h-auto [&_.react-pdf__Page__canvas]:max-h-screen",
                view === PdfView.grid && "w-full px-8"
            )}
        >
            <Document
                file={data}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={(e) => console.error("Pdf Loading Error: ", e)}
                onError={(e) => console.warn("Pdf Error: ", e)}
                options={pdfOptions}
                loading={<LoadingComponent />}
                className={cn(
                    "max-h-screen",
                    view === PdfView.grid && "w-full",
                    view === PdfView.withToc && "flex flex-row",
                    view === PdfView.singlePage && "max-w-[min(768px,90%)] "
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
};

PdfContainer.displayName = "PdfContainer";
