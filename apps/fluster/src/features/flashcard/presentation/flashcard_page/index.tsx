import React, { type ReactNode } from "react";
import { FlashcardPreview } from "./flashcard_preview";

export const FlashcardPage = (): ReactNode => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center min-h-[calc(100vh-2rem)]">
            <FlashcardPreview />
        </div>
    );
};

FlashcardPage.displayName = "FlashcardPage";
