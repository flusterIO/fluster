import React, { useEffect, useState, type ReactNode } from "react";
import { FlashcardTable } from ".";
import { commands, FlashcardModel } from "@/lib/bindings";
import { getMaxPagination } from "@/lib/max_pagination";
import { showErrorToast, useEventListener } from "@fluster.io/dev";
import { LoadingComponent } from "@/components/loading_screen";

declare global {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface WindowEventMap {
        "request-update-flashcard-table": CustomEvent<null>;
    }
}

export const FlashcardTableWrapper = (): ReactNode => {
    const [data, setData] = useState<FlashcardModel[] | null>(null);
    const getData = async (): Promise<void> => {
        const res = await commands.getFlashcardSummaries(getMaxPagination());
        if (res.status === "ok") {
            setData(res.data);
        } else {
            showErrorToast(
                "Fluster could not gather your flashcards. If this error persists, please file an issue on Github."
            );
            setData([]);
        }
    };
    useEffect(() => {
        getData();
    }, []);

    useEventListener("request-update-flashcard-table", () => {
        getData();
    });

    if (data === null) {
        return (
            <div className="w-full h-full min-h-[calc(100vh-2rem)]">
                <LoadingComponent />
            </div>
        );
    }
    return (
        <div className="min-h-[min(70vh,768px)] w-full">
            <FlashcardTable flashcards={data} />
        </div>
    );
};

FlashcardTableWrapper.displayName = "FlashcardTableWrapper";
