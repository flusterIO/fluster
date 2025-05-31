import { onBoardingPageData } from "#/onboarding/data/onboarding_data";
import { useOnboardingStateContext } from "#/onboarding/state/onboarding_context";
import React, { type ReactNode } from "react";

const OnboardingSideBar = (): ReactNode => {
    const state = useOnboardingStateContext();
    return (
        <div className="w-1/3 bg-primary text-primary-foreground h-full py-12 px-6 md:px-8 z-10 flex flex-col justify-center items-center gap-6">
            <div className="w-fit max-w-[min(85%,768px)] h-[min(100vh,540px)] flex flex-col justify-start items-start gap-6">
                <h2 className="scroll-m-20 border-b border-white pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    {onBoardingPageData[state.pageIndex].sidebar.title}
                </h2>
                <p>{onBoardingPageData[state.pageIndex].sidebar.body}</p>
            </div>
        </div>
    );
};

OnboardingSideBar.displayName = "OnboardingSideBar";

export default OnboardingSideBar;
