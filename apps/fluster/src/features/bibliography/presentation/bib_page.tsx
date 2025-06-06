import PanelContainer from "@/components/util/panel_container";
import React, { type ReactNode } from "react";
import BibliographyPageContent from "./bib_table";
import PageContainer from "@/components/util/page_container";

const BibliographyPage = (): ReactNode => {
    return (
        <PageContainer>
            <BibliographyPageContent />
        </PageContainer>
    );
};

BibliographyPage.displayName = "BibliographyPage";

export default BibliographyPage;
