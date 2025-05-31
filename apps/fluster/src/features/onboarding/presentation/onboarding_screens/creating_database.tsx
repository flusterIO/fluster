import React, { type ReactNode } from "react";
import { H1 } from "@/components/typography/typography";
import { Button } from "@fluster.io/dev";
/* import { commands } from "@/lib/bindings"; */

const OnboardingCreateDatabaseScreen = (): ReactNode => {
    const handleClick = (): void => {
        /* RESUME: Pick back up here and run the necessary initialization steps one by one. */
        /* commands.  */
    };
    return (
        <div className="max-w-[768px] flex flex-col justify-center items-start gap-8 px-8">
            <H1>Welcome to Fluster!</H1>
            <p className="text-muted-foreground">
                It looks like you're either new here or resetting your database. Don't
                worry, we just have to regenerate some tables.
            </p>
            <div className="w-full flex flex-row justify-end items-center">
                <Button onClick={handleClick}>Create Database</Button>
            </div>
        </div>
    );
};

OnboardingCreateDatabaseScreen.displayName = "OnboardingCreateDatabaseScreen";

export default OnboardingCreateDatabaseScreen;
