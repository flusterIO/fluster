import PanelContainer from "@/components/util/panel_container";
import React, { useEffect, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router";
import { EmbeddedDocsByFilePath } from "../embedded_docs_by_fs_path";

const EmbeddedDocsDashboardPage = (): ReactNode => {
    const [searchParams] = useSearchParams();
    const filePath = searchParams.get("fsPath");
    if (filePath) {
        return <EmbeddedDocsByFilePath filePath={filePath} />;
    }
    return <PanelContainer>Embedded Docs</PanelContainer>;
};

EmbeddedDocsDashboardPage.displayName = "EmbeddedDocsDashboardPage";

export default EmbeddedDocsDashboardPage;
