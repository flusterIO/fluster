import React, { type ReactNode } from "react";
import { FlashcardQuizProvider } from "#/flashcard/state/context/flashcard_quiz_context/provider";
import { FlashcardQuizDataBar } from "./data_bar";
import { FlashcardQuizWrapper } from "./flashcard_wrapper";
import { FlashcardQuizCompletePage } from "./flashcard_complete_page";

export const FlashcardQuizPage = (): ReactNode => {
    return (
        <div className="@container/flashcard_quiz w-full px-8 min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center">
            <FlashcardQuizProvider>
                <FlashcardQuizCompletePage />
                <FlashcardQuizDataBar />
                <FlashcardQuizWrapper />
            </FlashcardQuizProvider>
        </div>
    );
};

FlashcardQuizPage.displayName = "FlashcardQuizPage";
