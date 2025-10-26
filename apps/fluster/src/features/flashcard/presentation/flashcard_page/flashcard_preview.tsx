import React, { useState, type ReactNode } from "react";
import { useEventListener } from "@fluster.io/dev";
import { FlashcardItem } from "../flashcard_item";
import { FlashcardMode } from "#/flashcard/data/types";
import { FlashcardDataSchema } from "#/flashcard/data/add_flashcard_schema";

declare global {
    interface WindowEventMap {
        "add-flashcard-preview-update": CustomEvent<FlashcardDataSchema>;
        "set-flashcard-preview-mode": CustomEvent<FlashcardMode>;
    }
}

export const FlashcardPreview = (): ReactNode => {
    const [data, setData] = useState<FlashcardDataSchema>({
        question: "",
        answer: "",
        answer_description: "",
        label: "",
        question_description: "",
        subject: "",
        topic: "",
        tags: [],
        id: null,
    });
    const [mode, setMode] = useState<FlashcardMode>("question");
    useEventListener("add-flashcard-preview-update", (e) => setData(e.detail));
    useEventListener("set-flashcard-preview-mode", (e) => {
        setMode(e.detail);
    });
    return <FlashcardItem isPreview setMode={setMode} item={data} mode={mode} />;
};

FlashcardPreview.displayName = "FlashcardPreview";
