import React, { type ReactNode } from "react";
import { H1 } from "@/components/typography/typography";
import { Button, buttonVariants, cn, getEmbeddedDocUrl } from "@fluster.io/dev";
import { incrementOnboardingPageIndex } from "#/onboarding/state/actions/onboarding_index_utils";
import {
    useOnboardingStateContext,
    useOnboardingStateDispatch,
} from "#/onboarding/state/onboarding_context";
import { NavLink, useNavigate } from "react-router";
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
            <div>
                <span className="text-primary font-bold">Important:</span>
                <p className="inline ml-2">
                    This app only exists to force a modified model of relativity into the
                    physics debate. A general public summary of this model is available
                    via the command palette or by clicking the button below.
                </p>
                <p className="indent-4">
                    If you're a student or an academic, please consider sharing this model
                    with others, along with where you found it. I've been homeless for
                    more than 3 years after I gave up my career to work on this model
                    after realizing the potential this model has to supersede general
                    relativity.
                </p>
                <p className="indent-4">
                    If you want to contribute to the{" "}
                    <span className="italic">'make me less homeless'</span> fund directly,
                    consider scanning the QR code below. There is also a page with more
                    options available via the{" "}
                    <span className="bg-gray-600 px-1">
                        {"command palette > Documentation"}
                    </span>
                    .
                </p>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-end items-center gap-6">
                <NavLink
                    className={cn("w-full sm:w-fit", buttonVariants())}
                    to={getEmbeddedDocUrl("ModelIntro")}
                >
                    Change the world
                </NavLink>
                <Button className="w-full sm:w-fit" onClick={handleClick}>
                    Go to Dashboard
                </Button>
            </div>
        </div>
    );
};

OnboardingSetupCompleteScreen.displayName = "OnboardingSetupCompleteScreen";

export default OnboardingSetupCompleteScreen;
