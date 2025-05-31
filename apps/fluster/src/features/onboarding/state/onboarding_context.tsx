import { createContext, Dispatch, useContext } from "react";
import { OnboardingStateContext, OnboardingStateContextActions } from "./types";

export const OnboardingStateDispatchContext = createContext<
    Dispatch<OnboardingStateContextActions>
>(null!);

export const useOnboardingStateContext = () =>
    useContext(OnboardingStateContext);
export const useOnboardingStateDispatch = () =>
    useContext(OnboardingStateDispatchContext);
