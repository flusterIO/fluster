import SidePanelContainer from "@/components/side_panel_container";
import { Form, Button, useEventListener, showToast } from "@fluster.io/dev";
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
import { FlashcardFormStageThree } from "./stage_3";
import { commands } from "@/lib/bindings";
import { useSearchParams } from "react-router";

declare global {
    interface WindowEventMap {
        "flashcard-save-success": CustomEvent<null>;
    }
}

import { AppState } from "@/state/initial_state";
import { connect } from "react-redux";

const connector = connect((state: AppState) => ({
    panelOpen: state.panelLeft.open,
}));

export const FlashcardPanelLeft = connector(
    ({ panelOpen }: { panelOpen: boolean }): ReactNode => {
        const MAX_STAGE = 3;
        const [stage, setStage] = useState(1);
        const form = useForm({
            resolver: zodResolver(flashcardDataSchema),
            defaultValues: {
                id: null,
                label: "",
                answer: "",
                answer_description: "",
                question: "",
                question_description: "",
                subject: "",
                topic: "",
                tags: [],
                correct_count: 0,
                incorrect_count: 0,
            },
        });

        const [sp, setSp] = useSearchParams();
        const editing = sp.get("editing");
        const handleEditing = async (editingId: string): Promise<void> => {
            const res = await commands.getFlashcardData(editingId);
            if (res.status === "ok") {
                form.setValue("id", res.data.id);
                form.setValue("label", res.data.label);
                form.setValue("answer", res.data.answer);
                form.setValue("answer_description", res.data.answer_description);
                form.setValue("question", res.data.question);
                form.setValue("question_description", res.data.question_description);
                form.setValue(
                    "subject",
                    res.data.subject ? res.data.subject.subject_value : ""
                );
                form.setValue(
                    "topic",
                    res.data.topic ? res.data.topic.topic_value : ""
                );
                form.setValue(
                    "tags",
                    res.data.tags.map((t) => t.tag_value)
                );
                form.setValue("correct_count", res.data.correct_count);
                form.setValue("incorrect_count", res.data.incorrect_count);
            }
        };

        const exitEditingMode = (): void => {
            console.log(`Here...`);
            sp.delete("editing");
            setSp(sp);
        };

        useEffect(() => {
            if (editing) {
                handleEditing(editing);
            }
            /* eslint-disable-next-line  -- I hate this rule. */
        }, [editing]);
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
                form.handleSubmit(async (data) => {
                    const { tags, subject, topic, ..._data } = data;
                    const res = await commands.saveFlashcard(
                        {
                            ..._data,
                            id: _data.id ? _data.id : await commands.getUniqueId(),
                        },
                        tags,
                        topic,
                        subject
                    );
                    if (res.status === "ok") {
                        form.reset();
                        setStage(1);
                        window.dispatchEvent(
                            new CustomEvent("set-flashcard-preview-mode", {
                                detail: "question",
                            })
                        );
                    } else {
                        showToast({
                            title: "Oh no",
                            body: "Something went wrong. If this error continues, please file an issue on Github.",
                            duration: 5000,
                            variant: "Error",
                        });
                    }
                })();
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

        useEffect(() => {
            return () => {
                if (editing) {
                    exitEditingMode();
                }
            };
        }, [editing]);

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
                className="px-4 @container/flashcard_panel"
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
                    {stage === 3 && <FlashcardFormStageThree form={form} />}
                </Form>
                <div className="w-full flex flex-col @[200px]/flashcard_panel:flex-row justify-end items-center gap-x-4 gap-y-2">
                    {stage > 1 && (
                        <Button
                            variant={"secondary"}
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
                            className="w-full @[200px]/flashcard_panel:w-fit"
                        >
                            Back
                        </Button>
                    )}
                    <Button
                        onClick={handleSubmit}
                        className="w-full @[200px]/flashcard_panel:w-fit"
                    >
                        {stage < MAX_STAGE ? "Continue" : "Submit"}
                    </Button>
                </div>
            </SidePanelContainer>
        );
    }
);

FlashcardPanelLeft.displayName = "FlashcardPanelLeft";
