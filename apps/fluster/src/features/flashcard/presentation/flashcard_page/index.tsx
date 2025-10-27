import React, { type ReactNode } from "react";
import { FlashcardPreview } from "./flashcard_preview";

import { AppState } from "@/state/initial_state";
import { connect } from "react-redux";
import { FlashcardTableWrapper } from "./flashcard_table/flashcard_table_wrapper";

const connector = connect((state: AppState) => ({
    panelOpen: state.panelLeft.open,
}));

interface Props {
    panelOpen: boolean;
}

export const FlashcardPage = connector(({ panelOpen }: Props): ReactNode => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center min-h-[calc(100vh-2rem)]">
            {panelOpen ? <FlashcardPreview /> : <FlashcardTableWrapper />}
        </div>
    );
});

FlashcardPage.displayName = "FlashcardPage";
