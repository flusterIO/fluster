"use client";
import React, { ReactNode, useReducer } from "react";
import {
    defaultInitialValues,
    OnboardingStateContext,
    OnboardingStateContextActions,
    OnboardingStateState,
} from "./types";
import { OnboardingStateDispatchContext } from "./onboarding_context";

export const OnboardingStateContextReducer = (
    state: OnboardingStateState,
    action: OnboardingStateContextActions
): OnboardingStateState => {
    switch (action.type) {
        case "decrement_onboarding_index": {
            return {
                ...state,
                pageIndex: Math.max(state.pageIndex - 1, 0),
            };
        }
        case "increment_onboarding_index": {
            return {
                ...state,
                pageIndex: state.pageIndex + 1,
            };
        }
        default: {
            return state;
        }
    }
};

OnboardingStateContextReducer.displayName = "OnboardingStateContextReducer";

interface OnboardingStateProviderProps {
    children: ReactNode;
    initialValues?: Partial<OnboardingStateState>;
}

export const OnboardingStateProvider = ({
    children,
    initialValues,
}: OnboardingStateProviderProps) => {
    const [state, dispatch] = useReducer(
        OnboardingStateContextReducer,
        initialValues
            ? { ...initialValues, ...defaultInitialValues }
            : defaultInitialValues
    );

    return (
        <OnboardingStateContext.Provider value={state}>
            <OnboardingStateDispatchContext.Provider value={dispatch}>
                {children}
            </OnboardingStateDispatchContext.Provider>
        </OnboardingStateContext.Provider>
    );
};
