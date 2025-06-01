import React, { type ReactNode } from "react";
import { H1 } from "@/components/typography/typography";
import { Button } from "@fluster.io/dev";
import { commands } from "@/lib/bindings";
import { incrementOnboardingPageIndex } from "#/onboarding/state/actions/onboarding_index_utils";
import {
    useOnboardingStateContext,
    useOnboardingStateDispatch,
} from "#/onboarding/state/onboarding_context";
import { useNavigate } from "react-router";

const OnboardingCopyMathjaxScreen = (): ReactNode => {
    const state = useOnboardingStateContext();
    const dispatch = useOnboardingStateDispatch();
    const nav = useNavigate();
    const handleClick = async (): Promise<void> => {
        /* RESUME: Pick back up here and run the necessary initialization steps one by one. */
        console.log(`Initializing database...`);
        const res = await commands.copyMathjax();
        if (res.status === "error") {
            console.warn(`Fluster encountered an error while attempting to copy necessary mathjajx files.
If you encounter issues with math rendering, please submit an issue on Github.`);
        }
        incrementOnboardingPageIndex(state.pageIndex, dispatch, nav);
    };
    return (
        <div className="max-w-[768px] flex flex-col justify-center items-start gap-8 px-8">
            <H1>How do you feel about math?</H1>
            <p className="text-muted-foreground">
                Whether you're a fan or not, we have to copy over some files so math can
                be rendered in Fluster.
            </p>
            <div className="w-full flex flex-row justify-end items-center">
                <Button onClick={handleClick}>Copy Files</Button>
            </div>
        </div>
    );
};

OnboardingCopyMathjaxScreen.displayName = "OnboardingCopyMathjaxScreen";

export default OnboardingCopyMathjaxScreen;
