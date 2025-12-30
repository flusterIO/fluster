import { PdfComponent } from "#/features/docs/pdf_component/pdf_component";
import React, { type ReactNode } from "react";

const PdfPageProps = (): ReactNode => {
    return (
        <div className="w-full h-full flex flex-col justify-start items-center">
            <PdfComponent file="/assets/pdf/paper_preprint.pdf" />
        </div>
    );
};

PdfPageProps.displayName = "PdfPageProps";

export default PdfPageProps;
