import { FlashcardDataSchema } from "#/flashcard/data/add_flashcard_schema";
import {
    AutoCompleteInput,
    AutoCompleteOption,
    TagInput,
    TextInputGroup,
} from "@fluster.io/dev";
import React, { useEffect, type ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";

import { AppState } from "@/state/initial_state";
import { connect } from "react-redux";
import { useFlashcardTopicsAndSubjects } from "#/flashcard/state/hooks/use_flashcard_topics_and_subjects";

const connector = connect((state: AppState) => ({
    panelOpen: state.panelLeft.open,
}));

interface FlashcardFormStageOneProps {
    form: UseFormReturn<FlashcardDataSchema>;
    panelOpen: boolean;
}

export const FlashcardFormStageOne = connector(
    ({ form, panelOpen }: FlashcardFormStageOneProps): ReactNode => {
        const flashcardTopicSubject = useFlashcardTopicsAndSubjects();

        useEffect(() => {
            if (panelOpen) {
                document.getElementById("flashcard-label-input")?.focus();
            }
        }, [panelOpen]);

        return (
            <>
                <TextInputGroup
                    ids={{
                        input: "flashcard-label-input",
                    }}
                    form={form}
                    name="label"
                    label="Label"
                    desc="This field can accept latex."
                />
                <AutoCompleteInput
                    classes={{
                        button: "w-full",
                        popoverContent: "w-full",
                    }}
                    form={form}
                    options={flashcardTopicSubject.topics.map((topic) => {
                        return {
                            label: topic.value,
                            value: topic.value,
                        } satisfies AutoCompleteOption;
                    })}
                    name="topic"
                    label="Topic"
                    defaultDisplayValue="Select topic"
                    searchText="Search topics"
                    onCreateItem={(val) => {
                        form.setValue("topic", val);
                    }}
                />
                <AutoCompleteInput
                    classes={{
                        button: "w-full",
                        popoverContent: "w-full",
                    }}
                    form={form}
                    options={flashcardTopicSubject.subjects.map((subject) => {
                        return {
                            label: subject.value,
                            value: subject.value,
                        } satisfies AutoCompleteOption;
                    })}
                    name="subject"
                    label="Subject"
                    defaultDisplayValue="Select subject"
                    searchText="Search subjects"
                    onCreateItem={(val) => {
                        form.setValue("subject", val);
                    }}
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
    }
);

FlashcardFormStageOne.displayName = "FlashcardFormStageOne";
