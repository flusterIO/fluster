"use client";
import React, { type ReactNode } from "react";
import { PdfComponentWrappedProps } from "./pdf_component_wrapped";
import dynamic from "next/dynamic";
const PdfComponentWrapped = dynamic(
    () =>
        import("#/features/docs/pdf_component/pdf_component_wrapped").then(
            (x) => x.PdfComponentWrapped
        ),
    {
        ssr: false,
    }
);

export const PdfComponent = (props: PdfComponentWrappedProps): ReactNode => {
    return <PdfComponentWrapped {...props} />;
};

PdfComponent.displayName = "PdfComponent";
