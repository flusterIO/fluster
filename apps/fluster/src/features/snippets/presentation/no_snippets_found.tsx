import { H3, SmallText } from "@/components/typography/typography";
import React, { type ReactNode } from "react";

const NoSnippetsFound = (): ReactNode => {
    return (
        <div className="w-full h-full min-h-[calc(100vh-80px)] flex flex-col justify-center items-center">
            <div className="max-w-[350px] h-fit flex flex-col justify-center items-center">
                <H3 className="mb-4">No Snippets Found</H3>
                <SmallText className="text-muted-foreground text-center">
                    The left panel includes a form to add and edit snippets. The right
                    panel handles your search filter settings.
                </SmallText>
            </div>
        </div>
    );
};

NoSnippetsFound.displayName = "NoSnippetsFound";

export default NoSnippetsFound;
