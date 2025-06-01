import React, { type ReactNode } from "react";
import { H1 } from "@/components/typography/typography";
import { Button } from "@fluster.io/dev";
import { incrementOnboardingPageIndex } from "#/onboarding/state/actions/onboarding_index_utils";
import {
    useOnboardingStateContext,
    useOnboardingStateDispatch,
} from "#/onboarding/state/onboarding_context";
import { useNavigate } from "react-router";
import { AppRoutes } from "#/router/data/app_routes";

const OnboardingSetupCompleteScreen = (): ReactNode => {
    const state = useOnboardingStateContext();
    const dispatch = useOnboardingStateDispatch();
    const nav = useNavigate();
    const handleClick = async (): Promise<void> => {
        incrementOnboardingPageIndex(state.pageIndex, dispatch, nav);
        nav(AppRoutes.dashboard);
    };
    return (
        <div className="max-w-[768px] flex flex-col justify-center items-start gap-8 px-8">
            <H1>That's it!</H1>
            <p className="text-muted-foreground">
                Use cmd+p to open the command palette. Almost all of the actions you'll
                need inside of Fluster are available from the command palette, including
                more documentation that will show you how to get the most from Fluster.
            </p>
            <div className="w-full flex flex-row justify-end items-center">
                <Button onClick={handleClick}>Go to Dashboard</Button>
            </div>
        </div>
    );
};

OnboardingSetupCompleteScreen.displayName = "OnboardingSetupCompleteScreen";

export default OnboardingSetupCompleteScreen;
