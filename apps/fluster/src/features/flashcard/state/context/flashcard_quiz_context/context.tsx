"use client";
import { createContext, useContext } from "react";

export interface FlashcardQuizState {
    activeIndex: number;
    ids: string[];
    correct_count: number;
    incorrect_count: number;
}

export const flashcardQuizInitialValues: FlashcardQuizState = {
    activeIndex: 0,
    ids: [],
    correct_count: 0,
    incorrect_count: 0,
};

export const FlashcardQuizContext = createContext<FlashcardQuizState>(
    flashcardQuizInitialValues
);

type FlashcardQuizContextActions =
    | {
        type: "set_active_index";
        payload: number;
    }
    | {
        type: "set_ids";
        payload: string[];
    }
    | {
        type: "add_incorrect";
        payload: void;
    }
    | {
        type: "add_correct";
        payload: void;
    }
    | {
        type: "reset_quiz";
        payload: void;
    }
    | {
        /** Will keep ids in place, restarting the same quiz. */
        type: "restart_quiz";
        payload: void;
    };

export const FlashcardQuizDispatchContext = createContext<
    React.Dispatch<FlashcardQuizContextActions>
>(null!);

export const useFlashcardQuizContext = () => useContext(FlashcardQuizContext);

export const useFlashcardQuizDispatch = () =>
    useContext(FlashcardQuizDispatchContext);

export const FlashcardQuizContextReducer = (
    state: FlashcardQuizState,
    action: FlashcardQuizContextActions
): FlashcardQuizState => {
    switch (action.type) {
        case "set_active_index": {
            return {
                ...state,
                activeIndex: action.payload,
            };
        }
        case "set_ids": {
            return {
                ...state,
                ids: action.payload,
            };
        }
        case "reset_quiz": {
            return flashcardQuizInitialValues;
        }
        case "restart_quiz": {
            return {
                ...state,
                activeIndex: 0,
                incorrect_count: 0,
                correct_count: 0,
            };
        }
        case "add_correct": {
            return {
                ...state,
                correct_count: state.correct_count + 1,
            };
        }
        case "add_incorrect": {
            return {
                ...state,
                incorrect_count: state.incorrect_count + 1,
            };
        }
        default: {
            return state;
        }
    }
};

FlashcardQuizContextReducer.displayName = "FlashcardQuizContextReducer";
