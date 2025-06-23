import PanelContainer from "@/components/util/panel_container";
import React, { type ReactNode } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { PdfContainer } from "../pdf_container";
import { PdfProvider } from "#/pdf/state/provider/pdf_provider";
import "../../data/utils/init_pdf";

export const PdfPage = (): ReactNode => {
    const [searchParams] = useSearchParams();
    const fsPath = searchParams.get("fsPath");
    const nav = useNavigate();
    if (!fsPath) {
        nav("/");
        return null;
    }
    return (
        <PanelContainer>
            <PdfProvider>
                <PdfContainer fsPath={fsPath} />
            </PdfProvider>
        </PanelContainer>
    );
};

PdfPage.displayName = "PdfPage";
