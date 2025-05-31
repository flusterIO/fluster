import React, { type ReactNode } from "react";
import { useHealthContext } from "./hooks";
import { ChildProps } from "@/types/general";
import OnboardingPage from "#/onboarding/presentation/onboarding";

const HealthOnboardingSwitch = ({ children }: ChildProps): ReactNode => {
    const state = useHealthContext();
    if (state.report?.healthy) {
        return children;
    } else {
        return <OnboardingPage />;
    }
};

HealthOnboardingSwitch.displayName = "HealthOnboardingSwitch";

export default HealthOnboardingSwitch;
