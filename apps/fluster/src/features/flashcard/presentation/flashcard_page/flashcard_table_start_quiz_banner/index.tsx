import {
    FLASHCARD_LOCAL_STORAGE_ID,
    FlashcardLocalStorageData,
} from "#/flashcard/data/types";
import { AppRoutes, Button } from "@fluster.io/dev";
import React, { type ReactNode } from "react";
import { useNavigate } from "react-router";

interface FlashcardTableStartQuizBannerProps {
    selectedIds: string[];
}

export const FlashcardTableStartQuizBanner = ({
    selectedIds,
}: FlashcardTableStartQuizBannerProps): ReactNode => {
    const nav = useNavigate();
    const handleStartQuiz = (): void => {
        window.localStorage.setItem(
            FLASHCARD_LOCAL_STORAGE_ID,
            JSON.stringify({
                ids: selectedIds,
            } satisfies FlashcardLocalStorageData)
        );
        const sp = new URLSearchParams();
        sp.set("by_local_storage", "true");
        nav(`${AppRoutes.flashcard_quiz}?${sp.toString()}`);
    };
    return (
        <div className="w-full flex flex-row justify-end items-center h-12">
            <Button
                className={selectedIds.length === 0 ? "hidden" : undefined}
                onClick={handleStartQuiz}
            >
                Start Quiz
            </Button>
        </div>
    );
};

FlashcardTableStartQuizBanner.displayName = "FlashcardTableStartQuizBanner";
