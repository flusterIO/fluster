import React, { ReactNode, useEffect, useReducer } from "react";
import {
    FlashcardQuizState,
    FlashcardQuizContextReducer,
    FlashcardQuizContext,
    FlashcardQuizDispatchContext,
    flashcardQuizInitialValues,
} from "./context";
import { useFlashcardLocalStorageIds } from "../../hooks/useFlashcardLocalStorageIds";

interface FlashcardQuizProviderProps {
    children: ReactNode;
    initialValues?: Partial<FlashcardQuizState>;
}

export const FlashcardQuizProvider = ({
    children,
    initialValues,
}: FlashcardQuizProviderProps) => {
    const [state, dispatch] = useReducer(
        FlashcardQuizContextReducer,
        initialValues
            ? { ...initialValues, ...flashcardQuizInitialValues }
            : flashcardQuizInitialValues
    );
    const fromLocalStorageIds = useFlashcardLocalStorageIds();

    useEffect(() => {
        if (fromLocalStorageIds?.length) {
            dispatch({
                type: "set_ids",
                payload: fromLocalStorageIds,
            });
        }
    }, [fromLocalStorageIds]);

    return (
        <FlashcardQuizContext.Provider value={state}>
            <FlashcardQuizDispatchContext.Provider value={dispatch}>
                {children}
            </FlashcardQuizDispatchContext.Provider>
        </FlashcardQuizContext.Provider>
    );
};
