import { onBoardingPageData } from "#/onboarding/data/onboarding_data";
import { NavigateFunction } from "react-router";
import { useOnboardingStateDispatch } from "../onboarding_context";
import { AppRoutes } from "#/router/data/app_routes";

export const incrementOnboardingPageIndex = (
    currentIndex: number,
    dispatch: ReturnType<typeof useOnboardingStateDispatch>,
    nav: NavigateFunction
) => {
    if (currentIndex < onBoardingPageData.length - 1) {
        dispatch({
            type: "increment_onboarding_index",
            payload: null,
        });
    } else {
        // nav(AppRoutes.dashboard.toString());
    }
};

export const decrementOnboardingPageIndex = (
    currentIndex: number,
    dispatch: ReturnType<typeof useOnboardingStateDispatch>
) => {
    if (currentIndex > 0) {
        dispatch({
            type: "decrement_onboarding_index",
            payload: null,
        });
    }
};
