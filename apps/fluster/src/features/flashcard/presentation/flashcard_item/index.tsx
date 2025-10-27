import { FlashcardDataSchema } from "#/flashcard/data/add_flashcard_schema";
import { cn } from "@fluster.io/dev";
import React, { type ReactNode } from "react";
import { AnswerCard } from "./answer_card";
import { FlashcardMode } from "#/flashcard/data/types";
import { QuestionCard } from "./question_card";

interface FlashcardItemProps {
    isPreview?: boolean;
    item: FlashcardDataSchema;
    mode: FlashcardMode;
    setMode: (mode: FlashcardMode) => void;
}

export const FlashcardItem = ({
    item,
    isPreview,
    mode,
}: FlashcardItemProps): ReactNode => {
    return (
        <div className="relative w-full h-full min-h-[calc(100vh-2rem)] flex flex-col justify-center items-center overflow-hidden">
            <AnswerCard
                item={item}
                isPreview={isPreview}
                classes={{
                    card: cn(
                        "transition-transform duration-300 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]",
                        mode === "answer" ? "translate-x-[-50%]" : "translate-x-[100vw]"
                    ),
                }}
            />
            <QuestionCard
                item={item}
                isPreview={isPreview}
                classes={{
                    card: cn(
                        "transition-transform duration-300 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]",
                        mode === "question"
                            ? "translate-x-[-50%]"
                            : "translate-x-[calc(-100vw-100%)]"
                    ),
                }}
            />
        </div>
    );
};

FlashcardItem.displayName = "FlashcardItem";
