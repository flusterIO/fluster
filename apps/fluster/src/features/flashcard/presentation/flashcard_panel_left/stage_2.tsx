import { FlashcardDataSchema } from "#/flashcard/data/add_flashcard_schema";
import React, { type ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";

interface FlashcardFormStageTwoProps {
    form: UseFormReturn<FlashcardDataSchema>;
}

export const FlashcardFormStageTwo = ({
    form,
}: FlashcardFormStageTwoProps): ReactNode => {
    return <>Stage 2</>;
};

FlashcardFormStageTwo.displayName = "FlashcardFormStageTwo";
