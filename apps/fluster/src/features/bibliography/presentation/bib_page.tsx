import React, { type ReactNode } from "react";
import PageContainer from "@/components/util/page_container";
import { BibliographyTable } from "./bib_table/index";

const BibliographyPage = (): ReactNode => {
    return (
        <PageContainer>
            <div className="w-full px-8 mt-8">
                <BibliographyTable />
            </div>
        </PageContainer>
    );
};

BibliographyPage.displayName = "BibliographyPage";

export default BibliographyPage;
