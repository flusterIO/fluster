import SidePanelContainer from "@/components/side_panel_container";
import { Form, Button, useEventListener } from "@fluster.io/dev";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { FlashcardFormStageOne } from "./stage_1";
import { FlashcardFormStageTwo } from "./stage_2";
import {
    FlashcardDataSchema,
    flashcardDataSchema,
} from "#/flashcard/data/add_flashcard_schema";
import { FlashcardMode } from "#/flashcard/data/types";

export const FlashcardPanelLeft = (): ReactNode => {
    const MAX_STAGE = 3;
    const [stage, setStage] = useState(1);
    const form = useForm({
        resolver: zodResolver(flashcardDataSchema),
        defaultValues: {
            id: null,
            label: "",
            answer: "",
            subject: "",
            topic: "",
            answer_description: "",
            question: "",
            question_description: "",
            tags: [],
        },
    });

    const handleSubmit = (): void => {
        if (stage < MAX_STAGE) {
            const newStage = stage + 1;
            setStage(newStage);
            if (newStage === 2) {
                window.dispatchEvent(
                    new CustomEvent("set-flashcard-preview-mode", {
                        detail: "question" satisfies FlashcardMode,
                    })
                );
            } else if (newStage === 3) {
                window.dispatchEvent(
                    new CustomEvent("set-flashcard-preview-mode", {
                        detail: "answer" satisfies FlashcardMode,
                    })
                );
            }
        } else {
            console.log(`Submitting...`);
        }
    };
    const updatePreview = (data: FlashcardDataSchema): void => {
        window.dispatchEvent(
            new CustomEvent("add-flashcard-preview-update", {
                detail: data,
            })
        );
    };
    useEffect(() => {
        const state = form.getValues();
        updatePreview(state);
    }, []);

    useEventListener("set-flashcard-preview-mode", (e) => {
        if (e.detail === "question") {
            setStage(2);
        } else if (e.detail === "answer") {
            setStage(3);
        }
    });

    form.watch((formState) => {
        updatePreview(formState as FlashcardDataSchema);
    });

    return (
        <SidePanelContainer
            className="px-4"
            label="Add a flashcard"
            desc={
                [
                    "Some basic info about your flashcard",
                    "Flashcard question",
                    "Flashcard answer",
                ][stage - 1]
            }
        >
            <Form {...form}>
                {stage === 1 && <FlashcardFormStageOne form={form} />}
                {stage === 2 && <FlashcardFormStageTwo form={form} />}
            </Form>
            <div className="w-full flex flex-row justify-end items-center gap-4">
                {stage > 1 && (
                    <Button
                        onClick={() => {
                            const newStage = stage - 1;
                            if (newStage === 2 && stage !== 1) {
                                window.dispatchEvent(
                                    new CustomEvent("set-flashcard-preview-mode", {
                                        detail: "question" satisfies FlashcardMode,
                                    })
                                );
                            } else if (newStage === 3 && stage !== 1) {
                                window.dispatchEvent(
                                    new CustomEvent("set-flashcard-preview-mode", {
                                        detail: "answer" satisfies FlashcardMode,
                                    })
                                );
                            }
                            setStage(newStage);
                        }}
                    >
                        Back
                    </Button>
                )}
                <Button onClick={handleSubmit}>
                    {stage < MAX_STAGE ? "Continue" : "Submit"}
                </Button>
            </div>
        </SidePanelContainer>
    );
};

FlashcardPanelLeft.displayName = "FlashcardPanelLeft";
