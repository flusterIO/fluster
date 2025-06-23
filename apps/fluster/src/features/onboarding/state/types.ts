import { createContext } from "react";

export interface OnboardingStateState {
    pageIndex: number;
}

export const defaultInitialValues: OnboardingStateState = {
    pageIndex: 0,
};

export type OnboardingStateContextActions =
    | {
        type: "increment_onboarding_index";
        payload: null;
    }
    | {
        type: "decrement_onboarding_index";
        payload: null;
    };

export const OnboardingStateContext =
    createContext<OnboardingStateState>(defaultInitialValues);
