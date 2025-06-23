import React, { type ReactNode } from "react";
import { OnboardingStateProvider } from "../state/onboarding_provider";
import OnboardingPageSwitch from "./onboarding_page_switch";
import OnboardingSideBar from "./onboarding_sidebar/onboarding_sidebar";
import PageContainer from "@/components/util/page_container";
import { MediaQuery } from "react-responsive";

const OnboardingPage = (): ReactNode => {
    return (
        <OnboardingStateProvider>
            <PageContainer className="absolute top-0 left-0 right-0 bottom-0 pt-0">
                <MediaQuery minWidth={980}>
                    <OnboardingSideBar />
                </MediaQuery>
                <div className="w-full h-full flex flex-col justify-center items-center gap-6">
                    <OnboardingPageSwitch />
                </div>
            </PageContainer>
        </OnboardingStateProvider>
    );
};

OnboardingPage.displayName = "OnboardingPage";

export default OnboardingPage;
