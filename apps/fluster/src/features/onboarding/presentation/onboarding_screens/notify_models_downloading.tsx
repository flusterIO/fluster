import { incrementOnboardingPageIndex } from '#/onboarding/state/actions/onboarding_index_utils';
import { useOnboardingStateContext, useOnboardingStateDispatch } from '#/onboarding/state/onboarding_context';
import { H1 } from '@/components/typography/typography'
import { Button } from '@fluster.io/dev';
import React, { type ReactNode } from 'react'
import { useNavigate } from 'react-router';


export const OnboardingNotifyOfModelsDownloading = (): ReactNode => {
    const state = useOnboardingStateContext();
    const dispatch = useOnboardingStateDispatch();
    const nav = useNavigate();
    const handleClick = (): void => {    
        incrementOnboardingPageIndex(state.pageIndex, dispatch, nav);
        }
return (
        <div className="max-w-[768px] flex flex-col justify-center items-start gap-8 px-8">
       <H1>Local AI</H1>
            <p className="text-muted-foreground">
                Since Fluster runs AI on your own hardware, we'll need to download some models. This can take some time, and unfortunately synchronizing your database will not work until this is complete.
            </p>
            <div className="w-full flex flex-row justify-end items-center">
                <Button onClick={handleClick}>I'm aware</Button>
            </div>
        </div>
)
}


OnboardingNotifyOfModelsDownloading.displayName = "OnboardingNotifyOfModelsDownloading"
