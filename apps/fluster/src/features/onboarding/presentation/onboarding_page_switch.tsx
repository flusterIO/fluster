import React, { useEffect, type ReactNode } from "react";
import OnboardingCreateDatabaseScreen from "./onboarding_screens/creating_database";
import { useOnboardingStateContext } from "../state/onboarding_context";
import OnboardingSetupCompleteScreen from "./onboarding_screens/setup_complete";

const OnboardingPageSwitch = (): ReactNode => {
    useEffect(() => {
        window.dispatchEvent(
            new CustomEvent("set-health-as-being-checked", {
                detail: {},
            })
        );
    }, []);
    const state = useOnboardingStateContext();
    switch (state.pageIndex) {
        case 0: {
            return <OnboardingCreateDatabaseScreen />;
        }
        case 1: {
            return <OnboardingSetupCompleteScreen />;
        }
    }
    return null;
};

OnboardingPageSwitch.displayName = "OnboardingPageSwitch";

export default OnboardingPageSwitch;
