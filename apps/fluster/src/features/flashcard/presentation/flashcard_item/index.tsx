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
    classes?: {
        container?: string;
    };
    onSkipClick?: () => void;
    onMarkCorrect?: () => void;
    onMarkIncorrect?: () => void;
}

export const FlashcardItem = ({
    item,
    isPreview,
    mode,
    classes = {},
    setMode,
    onSkipClick,
    onMarkIncorrect,
    onMarkCorrect,
}: FlashcardItemProps): ReactNode => {
    return (
        <div
            className={cn(
                "relative w-full h-full flex flex-col justify-center items-center overflow-hidden",
                classes.container
            )}
        >
            <AnswerCard
                item={item}
                isPreview={isPreview}
                setMode={setMode}
                onCorrectClick={onMarkCorrect}
                onIncorrectClick={onMarkIncorrect}
                classes={{
                    card: cn(
                        "transition-all duration-300 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]",
                        mode === "answer"
                            ? "translate-x-[-50%] opacity-1"
                            : "translate-x-[100vw] opacity-0"
                    ),
                }}
            />
            <QuestionCard
                item={item}
                isPreview={isPreview}
                setMode={setMode}
                onSkipClick={onSkipClick}
                classes={{
                    card: cn(
                        "transition-all duration-300 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]",
                        mode === "question"
                            ? "translate-x-[-50%] opacity-1"
                            : "translate-x-[calc(-100vw-100%)] opacity-0"
                    ),
                }}
            />
        </div>
    );
};

FlashcardItem.displayName = "FlashcardItem";
