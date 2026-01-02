"use client";
import React, { useEffect, useState, type ReactNode } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

export interface PdfComponentWrappedProps {
    file: string;
}

const MAX_WIDTH = 768;

export const PdfComponentWrapped = (
    props: PdfComponentWrappedProps
): ReactNode => {
    const [width, setWidth] = useState(-1);
    const [numPages, setNumPages] = useState<number>(-1);

    const handleResize = (): void => {
        setWidth(Math.min(window.innerWidth - 64, MAX_WIDTH));
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    if (width < 0) {
        return;
    }

    return (
        <Document
            /* className="w-[calc(100%-4rem)]" */
            file={props.file}
            onLoadSuccess={onDocumentLoadSuccess}
        >
            {numPages < 0
                ? null
                : Array(numPages)
                    .fill(0)
                    .map((_, i) => {
                        return (
                            <Page
                                key={`page-${i}`}
                                pageIndex={i}
                                className="w-full mt-8"
                                width={width}
                            />
                        );
                    })}
        </Document>
    );
};

PdfComponentWrapped.displayName = "PdfComponentWrapped";
