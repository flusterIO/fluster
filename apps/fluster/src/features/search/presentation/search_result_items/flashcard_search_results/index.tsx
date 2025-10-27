import { FlashcardTable } from "#/flashcard/presentation/flashcard_page/flashcard_table";
import { FlashcardModel } from "@/lib/bindings";
import React, { type ReactNode } from "react";

interface FlashcardSearchResultsProps {
    items: FlashcardModel[];
}

export const FlashcardSearchResults = ({
    items,
}: FlashcardSearchResultsProps): ReactNode => {
    if (items.length === 0) {
        return null;
    }
    return (
        <div>
            <FlashcardTable flashcards={items} />
        </div>
    );
};

FlashcardSearchResults.displayName = "FlashcardSearchResults";
