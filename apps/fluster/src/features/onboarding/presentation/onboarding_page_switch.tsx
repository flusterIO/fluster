import React, { type ReactNode } from "react";
import OnboardingCreateDatabaseScreen from "./onboarding_screens/creating_database";
import { useOnboardingStateContext } from "../state/onboarding_context";

const OnboardingPageSwitch = (): ReactNode => {
    const state = useOnboardingStateContext();
    switch (state.pageIndex) {
        case 0: {
            return <OnboardingCreateDatabaseScreen />;
        }
    }
    return null;
};

OnboardingPageSwitch.displayName = "OnboardingPageSwitch";

export default OnboardingPageSwitch;
