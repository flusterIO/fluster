import React, { type ReactNode } from "react";
import { cn, H1 } from "@fluster.io/dev";

export const ComingSoon = ({
    featureName,
    classes,
}: {
    /** 'this ${featureName} feature was present...' */
    featureName: string;
    classes?: {
        container?: string;
        title?: string;
        body?: string;
    };
}): ReactNode => {
    return (
        <div
            className={cn(
                "w-fit text-center flex flex-col justify-center items-center",
                classes?.container
            )}
        >
            <H1 className={classes?.title}>Coming Soon</H1>
            <div
                className={cn(
                    "text-muted-foreground max-w-[540px] mt-4",
                    classes?.body
                )}
            >
                {`This ${featureName} feature was present in the initial web based version of
                Fluster, but it is currently being rewritten in Rust.`}
            </div>
        </div>
    );
};

ComingSoon.displayName = "ComingSoon";
