import React, { type ReactNode } from "react";
import { BibliographyTable } from "./bib_table/index";
import PanelContainer from "@/components/util/panel_container";
import { BibTableProvider } from "../state/bib_table_provider";
import { BibTableButtomButtons } from "./bib_table/bottom_buttons";
import BibTableTitleBar from "./bib_table/top_title_bar";
import { BibTableFilterRow } from "./bib_table/bib_table_filter_row";
import { BibEntryDetailSheet } from "./bib_entry_detail_pane";
import { BodyPortal } from "@/components/body_portal";

const BibliographyPage = (): ReactNode => {
    return (
        <PanelContainer>
            <BibTableProvider>
                <div className="w-full min-w-full px-8 mt-8 flex flex-col justify-start items-center max-w-[1080px]">
                    <BibTableTitleBar />
                    <BibTableFilterRow />
                    <BibliographyTable />
                    <BibTableButtomButtons />
                    <BodyPortal>
                        <BibEntryDetailSheet />
                    </BodyPortal>
                </div>
            </BibTableProvider>
        </PanelContainer>
    );
};

BibliographyPage.displayName = "BibliographyPage";

export default BibliographyPage;
