import React, { type ReactNode } from "react";
import { H1 } from "@/components/typography/typography";
import { Button, FilePathInput, Form } from "@fluster.io/dev";
import { commands } from "@/lib/bindings";
import { incrementOnboardingPageIndex } from "#/onboarding/state/actions/onboarding_index_utils";
import {
    useOnboardingStateContext,
    useOnboardingStateDispatch,
} from "#/onboarding/state/onboarding_context";
import { useNavigate } from "react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    file_path: z.string(),
});

const OnBoardingSetDirectoryScreen = (): ReactNode => {
    const state = useOnboardingStateContext();
    const dispatch = useOnboardingStateDispatch();
    const nav = useNavigate();
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            file_path: "",
        },
    });
    const handleClick = async (): Promise<void> => {
        const res = await commands.initializeDatabase();
        if (res.status === "error") {
            console.warn(`Fluster encountered an error while attempting to initialize your database.
If you've already set up Fluster initially, this may just mean that the tables already exist and you can safely ignore this.
If you do encounter issues with your database, please submit an issue on Github.`);
        }
        incrementOnboardingPageIndex(state.pageIndex, dispatch, nav);
    };
    return (
        <div className="max-w-[768px] flex flex-col justify-center items-start gap-8 px-8">
            <H1>Help us find your notes</H1>
            <p className="text-muted-foreground">
                To better organize your notes while providing an added layer of
                security, you should keep your notes within a single directory. They can
                be nested in directories as deeply as you wish, but you need to provide
                a single parent directory for Fluster to find your notes.
            </p>
            <div>
                <span className="text-[#00ff00] font-bold">Hint:</span>
                <span>This can be configured later on the settings page.</span>
            </div>
            <Form {...form}>
                <FilePathInput
                    directory
                    form={form}
                    name="file_path"
                    label="Directory"
                />
            </Form>
            <div className="w-full flex flex-row justify-end items-center">
                <Button onClick={handleClick}>Continue</Button>
            </div>
        </div>
    );
};

OnBoardingSetDirectoryScreen.displayName = "OnBoardingSetDirectoryScreen";

export default OnBoardingSetDirectoryScreen;
