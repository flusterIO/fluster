import { FlashcardDataSchema } from "#/flashcard/data/add_flashcard_schema";
import { TextAreaInput } from "@fluster.io/dev";
import React, { type ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";

interface FlashcardFormStageThreeProps {
    form: UseFormReturn<FlashcardDataSchema>;
}

export const FlashcardFormStageThree = ({
    form,
}: FlashcardFormStageThreeProps): ReactNode => {
    return (
        <>
            <TextAreaInput
                form={form}
                name="answer"
                label="Answer"
                desc={"This field can accept the same mdx used elsewhere."}
            />
            <TextAreaInput
                form={form}
                name="answer_description"
                label="Answer Description"
                desc={"This field can accept the same mdx used elsewhere."}
            />
        </>
    );
};

FlashcardFormStageThree.displayName = "FlashcardFormStageThree";
