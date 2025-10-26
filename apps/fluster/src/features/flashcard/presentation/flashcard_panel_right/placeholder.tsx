import { H4 } from "@fluster.io/dev";
import React, { type ReactNode } from "react";

export const FlashcardPanelRightPlaceholder = (): ReactNode => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <H4>Coming Soon</H4>
            <p className="text-muted-foreground text-sm text-center">
                A drag-and-drop feature will be added here to easily share sets of
                flashcards as individual files. Expect this feature by the end of
                November.
            </p>
        </div>
    );
};

FlashcardPanelRightPlaceholder.displayName = "FlashcardPanelRightPlaceholder";
