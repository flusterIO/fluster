import { FlashcardDataSchema } from "#/flashcard/data/add_flashcard_schema";
import { AutoCompleteInput, TagInput, TextInputGroup } from "@fluster.io/dev";
import React, { type ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";

interface FlashcardFormStageOneProps {
    form: UseFormReturn<FlashcardDataSchema>;
}

export const FlashcardFormStageOne = ({
    form,
}: FlashcardFormStageOneProps): ReactNode => {
    return (
        <>
            <TextInputGroup form={form} name="label" label="Label" />
            <AutoCompleteInput
                classes={{
                    button: "w-full",
                    popoverContent: "w-full",
                }}
                form={form}
                options={[]}
                name="topic"
                label="Topic"
                defaultDisplayValue="Select topic"
                searchText="Search topics"
            />
            <AutoCompleteInput
                classes={{
                    button: "w-full",
                    popoverContent: "w-full",
                }}
                form={form}
                options={[]}
                name="subject"
                label="Subject"
                defaultDisplayValue="Select subject"
                searchText="Search subjects"
            />
            <TagInput
                classes={{
                    formItem: "w-full",
                    input: "w-full",
                }}
                form={form}
                name="tags"
                label="Tags"
            />
        </>
    );
};

FlashcardFormStageOne.displayName = "FlashcardFormStageOne";
