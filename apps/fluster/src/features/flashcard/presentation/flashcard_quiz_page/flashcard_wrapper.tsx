import React, { useEffect, useState, type ReactNode } from "react";
import { FlashcardItem } from "../flashcard_item";
import { FlashcardDataSchemaWithId } from "#/flashcard/data/add_flashcard_schema";
import { FlashcardMode } from "#/flashcard/data/types";
import { commands } from "@/lib/bindings";
import {
    useFlashcardQuizContext,
    useFlashcardQuizDispatch,
} from "#/flashcard/state/context/flashcard_quiz_context/context";

export const FlashcardQuizWrapper = (): ReactNode => {
    const [item, setItem] = useState<FlashcardDataSchemaWithId | null>(null);
    const [mode, setMode] = useState<FlashcardMode>("question");
    const getItem = async (_id: string): Promise<void> => {
        const res = await commands.getFlashcardData(_id);
        if (res.status === "ok") {
            setItem({
                id: res.data.id!,
                label: res.data.label,
                question: res.data.question,
                question_description: res.data.question_description,
                answer: res.data.answer,
                answer_description: res.data.answer_description,
                subject: res.data.subject?.subject_value ?? "",
                topic: res.data.topic?.topic_value ?? "",
                tags: res.data.tags.map((t) => t.tag_value),
                correct_count: res.data.correct_count,
                incorrect_count: res.data.incorrect_count,
            });
        }
    };

    const { activeIndex, ids } = useFlashcardQuizContext();
    const dispatch = useFlashcardQuizDispatch();
    useEffect(() => {
        getItem(ids[activeIndex]);
    }, [ids, activeIndex]);
    if (item === null) {
        return null;
    }

    if (activeIndex >= ids.length) {
        return null;
    }
    const toNext = (): void => {
        if (activeIndex < ids.length) {
            setMode("question");
            dispatch({
                type: "set_active_index",
                payload: activeIndex + 1,
            });
        }
    };
    const handleCorrectClick = async (): Promise<void> => {
        const res = await commands.setFlashcardCompleteStatus(item.id, true);
        console.log("res: ", res);
        if (res.status === "ok") {
            dispatch({
                type: "add_correct",
                payload: undefined,
            });
            toNext();
        }
    };
    const handleIncorrectClick = async (): Promise<void> => {
        const res = await commands.setFlashcardCompleteStatus(item.id, false);
        if (res.status === "ok") {
            dispatch({
                type: "add_incorrect",
                payload: undefined,
            });
            toNext();
        }
    };
    return (
        <FlashcardItem
            item={item}
            mode={mode}
            setMode={setMode}
            onMarkCorrect={handleCorrectClick}
            onMarkIncorrect={handleIncorrectClick}
            onSkipClick={toNext}
            classes={{
                container: "flex-grow",
            }}
        />
    );
};

FlashcardQuizWrapper.displayName = "FlashcardQuizWrapper";
