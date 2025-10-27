import React, { type ReactNode } from "react";
import { FlashcardQuizDataItem } from "./data_item";
import { useFlashcardQuizContext } from "#/flashcard/state/context/flashcard_quiz_context/context";
import { BadgeCheck, BadgeX } from "lucide-react";

export const FlashcardQuizDataBar = (): ReactNode => {
    const { activeIndex, correct_count, incorrect_count, ids } =
        useFlashcardQuizContext();
    if (activeIndex >= ids.length) {
        return null;
    }
    return (
        <div className="w-full max-w-[1080px] grid grid-cols-1 @[400px]/flashcard_quiz:grid-cols-2 @[640px]/flashcard_quiz:grid-cols-4 gap-x-4 gap-y-2">
            <FlashcardQuizDataItem
                title="Progress"
                body={`${activeIndex + 1}/${ids.length}`}
            />
            <FlashcardQuizDataItem
                Icon={BadgeCheck}
                title="Correct"
                body={`${correct_count}`}
            />
            <FlashcardQuizDataItem
                Icon={BadgeX}
                title="Incorrect"
                body={`${incorrect_count}`}
            />
            <FlashcardQuizDataItem
                title="Remaining"
                body={`${ids.length - activeIndex}`}
            />
        </div>
    );
};

FlashcardQuizDataBar.displayName = "FlashcardQuizDataBar";
