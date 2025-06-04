import PanelContainer from "@/components/util/panel_container";
import React, { type ReactNode } from "react";
import BibliographyPageContent from "./bib_table";

const BibliographyPage = (): ReactNode => {
    return (
        <PanelContainer>
            <BibliographyPageContent />
        </PanelContainer>
    );
};

BibliographyPage.displayName = "BibliographyPage";

export default BibliographyPage;
